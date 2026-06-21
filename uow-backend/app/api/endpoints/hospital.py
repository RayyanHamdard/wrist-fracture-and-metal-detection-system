"""
Hospital API Endpoints
-----------------------
Endpoints for hospital staff:
- View and manage assigned clients
- Perform image analysis
- View analysis history
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

router = APIRouter()


# ============ Pydantic Schemas ============

class ClientListItem(BaseModel):
    client_profile_id: int
    user_id: int
    client_id: str
    name: Optional[str]
    email: str
    organization: Optional[str]
    assigned_at: datetime
    total_analyses: int


class ClientDetail(BaseModel):
    client_profile_id: int
    user_id: int
    client_id: str
    name: Optional[str]
    email: str
    organization: Optional[str]
    phone: Optional[str]
    address: Optional[str]
    assigned_at: datetime
    analyses: List[dict]


class HospitalDashboardStats(BaseModel):
    total_clients: int
    total_analyses: int
    analyses_this_month: int
    hospital_name: str


def get_hospital_endpoints(get_db, get_current_user, User, ClientProfile, HospitalEntity, 
                           HospitalStaff, HospitalClient, AnalysisHistory):
    """
    Factory function to create hospital endpoints with dependencies injected.
    """
    
    # ============ Hospital Staff Authorization ============
    
    def require_hospital_staff(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
        if current_user.role != "hospital":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Hospital staff access required"
            )
        
        # Get hospital staff profile
        staff = db.query(HospitalStaff).filter(HospitalStaff.user_id == current_user.id).first()
        if not staff:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Hospital staff profile not found"
            )
        
        return {"user": current_user, "staff": staff}
    
    # ============ Dashboard ============
    
    @router.get("/dashboard/stats", response_model=HospitalDashboardStats)
    def get_dashboard_stats(
        db: Session = Depends(get_db),
        hospital_context = Depends(require_hospital_staff)
    ):
        """Get hospital dashboard statistics"""
        staff = hospital_context["staff"]
        
        # Get hospital info
        hospital = db.query(HospitalEntity).filter(HospitalEntity.id == staff.hospital_id).first()
        
        # Count assigned clients
        total_clients = db.query(HospitalClient).filter(
            HospitalClient.hospital_id == staff.hospital_id,
            HospitalClient.is_active == True
        ).count()
        
        # Get client user IDs for analysis count
        client_assignments = db.query(HospitalClient).filter(
            HospitalClient.hospital_id == staff.hospital_id,
            HospitalClient.is_active == True
        ).all()
        
        client_user_ids = []
        for assignment in client_assignments:
            client = db.query(ClientProfile).filter(ClientProfile.id == assignment.client_id).first()
            if client:
                client_user_ids.append(client.user_id)
        
        # Count analyses
        total_analyses = 0
        analyses_this_month = 0
        if client_user_ids:
            total_analyses = db.query(AnalysisHistory).filter(
                AnalysisHistory.user_id.in_(client_user_ids)
            ).count()
            
            # This month
            from datetime import datetime
            now = datetime.utcnow()
            month_start = datetime(now.year, now.month, 1)
            analyses_this_month = db.query(AnalysisHistory).filter(
                AnalysisHistory.user_id.in_(client_user_ids),
                AnalysisHistory.created_at >= month_start
            ).count()
        
        return HospitalDashboardStats(
            total_clients=total_clients,
            total_analyses=total_analyses,
            analyses_this_month=analyses_this_month,
            hospital_name=hospital.name if hospital else "Unknown"
        )
    
    # ============ Client Management ============
    
    @router.get("/clients", response_model=List[ClientListItem])
    def list_assigned_clients(
        search: Optional[str] = None,
        skip: int = Query(0, ge=0),
        limit: int = Query(50, ge=1, le=100),
        db: Session = Depends(get_db),
        hospital_context = Depends(require_hospital_staff)
    ):
        """List all clients assigned to this hospital"""
        staff = hospital_context["staff"]
        
        # Get assignments
        query = db.query(HospitalClient).filter(
            HospitalClient.hospital_id == staff.hospital_id,
            HospitalClient.is_active == True
        )
        
        assignments = query.offset(skip).limit(limit).all()
        
        result = []
        for assignment in assignments:
            client = db.query(ClientProfile).filter(ClientProfile.id == assignment.client_id).first()
            if not client:
                continue
            
            user = db.query(User).filter(User.id == client.user_id).first()
            if not user:
                continue
            
            # Apply search filter
            if search:
                search_lower = search.lower()
                if not (
                    (user.name and search_lower in user.name.lower()) or
                    search_lower in user.email.lower() or
                    search_lower in client.client_id.lower()
                ):
                    continue
            
            # Count analyses
            analysis_count = db.query(AnalysisHistory).filter(
                AnalysisHistory.user_id == user.id
            ).count()
            
            result.append(ClientListItem(
                client_profile_id=client.id,
                user_id=user.id,
                client_id=client.client_id,
                name=user.name,
                email=user.email,
                organization=client.organization,
                assigned_at=assignment.assigned_at,
                total_analyses=analysis_count
            ))
        
        return result
    
    @router.get("/clients/{client_profile_id}", response_model=ClientDetail)
    def get_client_detail(
        client_profile_id: int,
        db: Session = Depends(get_db),
        hospital_context = Depends(require_hospital_staff)
    ):
        """Get detailed client information"""
        staff = hospital_context["staff"]
        
        # Verify client is assigned to this hospital
        assignment = db.query(HospitalClient).filter(
            HospitalClient.hospital_id == staff.hospital_id,
            HospitalClient.client_id == client_profile_id,
            HospitalClient.is_active == True
        ).first()
        
        if not assignment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Client not found or not assigned to your hospital"
            )
        
        client = db.query(ClientProfile).filter(ClientProfile.id == client_profile_id).first()
        if not client:
            raise HTTPException(status_code=404, detail="Client profile not found")
        
        user = db.query(User).filter(User.id == client.user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Get analyses
        analyses = db.query(AnalysisHistory).filter(
            AnalysisHistory.user_id == user.id
        ).order_by(AnalysisHistory.created_at.desc()).limit(20).all()
        
        analysis_list = [
            {
                "id": a.id,
                "image_type": a.image_type,
                "original_filename": a.original_filename,
                "created_at": a.created_at.isoformat(),
                "detections": a.detections
            }
            for a in analyses
        ]
        
        return ClientDetail(
            client_profile_id=client.id,
            user_id=user.id,
            client_id=client.client_id,
            name=user.name,
            email=user.email,
            organization=client.organization,
            phone=client.phone,
            address=client.address,
            assigned_at=assignment.assigned_at,
            analyses=analysis_list
        )
    
    @router.get("/clients/{client_profile_id}/analyses")
    def get_client_analyses(
        client_profile_id: int,
        skip: int = Query(0, ge=0),
        limit: int = Query(20, ge=1, le=100),
        db: Session = Depends(get_db),
        hospital_context = Depends(require_hospital_staff)
    ):
        """Get analysis history for a specific client"""
        staff = hospital_context["staff"]
        
        # Verify client is assigned to this hospital
        assignment = db.query(HospitalClient).filter(
            HospitalClient.hospital_id == staff.hospital_id,
            HospitalClient.client_id == client_profile_id,
            HospitalClient.is_active == True
        ).first()
        
        if not assignment:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Client not found or not assigned to your hospital"
            )
        
        client = db.query(ClientProfile).filter(ClientProfile.id == client_profile_id).first()
        if not client:
            raise HTTPException(status_code=404, detail="Client profile not found")
        
        analyses = db.query(AnalysisHistory).filter(
            AnalysisHistory.user_id == client.user_id
        ).order_by(AnalysisHistory.created_at.desc()).offset(skip).limit(limit).all()
        
        return [
            {
                "id": a.id,
                "image_type": a.image_type,
                "original_filename": a.original_filename,
                "processed_filename": a.processed_filename,
                "detections": a.detections,
                "created_at": a.created_at.isoformat(),
                "notes": a.notes
            }
            for a in analyses
        ]
    
    # ============ Hospital Profile ============
    
    @router.get("/profile")
    def get_hospital_profile(
        db: Session = Depends(get_db),
        hospital_context = Depends(require_hospital_staff)
    ):
        """Get current hospital staff profile and hospital info"""
        user = hospital_context["user"]
        staff = hospital_context["staff"]
        
        hospital = db.query(HospitalEntity).filter(HospitalEntity.id == staff.hospital_id).first()
        
        return {
            "user": {
                "id": user.id,
                "email": user.email,
                "name": user.name,
                "role": user.role
            },
            "staff": {
                "id": staff.id,
                "staff_id": staff.staff_id,
                "department": staff.department,
                "position": staff.position,
                "can_manage_clients": staff.can_manage_clients
            },
            "hospital": {
                "id": hospital.id if hospital else None,
                "name": hospital.name if hospital else None,
                "code": hospital.code if hospital else None,
                "address": hospital.address if hospital else None,
                "phone": hospital.phone if hospital else None,
                "email": hospital.email if hospital else None
            } if hospital else None
        }
    
    return router

