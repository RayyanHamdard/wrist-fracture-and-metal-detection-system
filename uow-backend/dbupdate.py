"""
Database Migration Script
==========================
Run this script to update the database schema with new tables for 
role-based access control system.

Usage:
    python dbupdate.py

This script will:
1. Create new tables if they don't exist
2. Remove any existing admin users and create a new default admin user
3. Create a sample hospital entity
"""

from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import sys

# Import from main to get all models
sys.path.insert(0, '.')
from app.main import (
    Base, engine, SessionLocal, User, ClientProfile, HospitalEntity, 
    HospitalStaff, HospitalClient, AdminProfile, AnalysisHistory,
    get_password_hash
)

def run_migration():
    """Run the database migration"""
    print("=" * 60)
    print("Database Migration for Role-Based Access Control")
    print("=" * 60)
    
    db = SessionLocal()
    
    # First, add missing columns to existing users table
    print("\n[1/5] Checking and adding missing columns to users table...")
    try:
        # Check and add 'status' column
        try:
            db.execute(text("SELECT status FROM users LIMIT 1"))
            print("  ✓ Column 'status' already exists")
        except:
            db.rollback()
            db.execute(text("ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'active'"))
            db.commit()
            print("  ✓ Added column 'status'")
        
        # Check and add 'created_at' column
        try:
            db.execute(text("SELECT created_at FROM users LIMIT 1"))
            print("  ✓ Column 'created_at' already exists")
        except:
            db.rollback()
            db.execute(text("ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP"))
            db.commit()
            print("  ✓ Added column 'created_at'")
        
        # Check and add 'updated_at' column
        try:
            db.execute(text("SELECT updated_at FROM users LIMIT 1"))
            print("  ✓ Column 'updated_at' already exists")
        except:
            db.rollback()
            db.execute(text("ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP"))
            db.commit()
            print("  ✓ Added column 'updated_at'")
            
    except Exception as e:
        print(f"  ⚠ Warning while adding columns: {e}")
        db.rollback()
    
    db.close()
    
    # Create all new tables
    print("\n[2/5] Creating new database tables...")
    try:
        Base.metadata.create_all(bind=engine)
        print("✓ Tables created successfully")
    except Exception as e:
        print(f"✗ Error creating tables: {e}")
        return False
    
    db = SessionLocal()
    
    try:
        # Check for existing admin and replace with new default admin
        print("\n[3/5] Checking for admin users...")
        existing_admins = db.query(User).filter(User.role == "admin").all()
        admin_count = len(existing_admins)
        
        if admin_count > 0:
            print(f"  Found {admin_count} existing admin user(s). Removing them...")
            
            # Delete admin profiles first (to avoid foreign key issues)
            for admin_user in existing_admins:
                admin_profile = db.query(AdminProfile).filter(AdminProfile.user_id == admin_user.id).first()
                if admin_profile:
                    db.delete(admin_profile)
            
            # Delete existing admin users
            for admin_user in existing_admins:
                db.delete(admin_user)
            
            db.commit()
            print(f"  ✓ Removed {admin_count} existing admin user(s)")
        
        # Create new default admin user
        print("  Creating default admin...")
        
        admin_user = User(
            email="admin@diagnostichub.ai",
            hashed_password=get_password_hash("admin123"),
            role="admin",
            name="System Administrator",
            status="active"
        )
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        
        # Create admin profile
        admin_profile = AdminProfile(
            user_id=admin_user.id,
            admin_id="ADM-000001",
            department="IT",
            access_level="full"
        )
        db.add(admin_profile)
        db.commit()
        
        print(f"✓ Default admin created:")
        print(f"  Email: admin@diagnostichub.ai")
        print(f"  Password: admin123")
        print(f"  ⚠️  IMPORTANT: Change this password immediately!")
        
        # Check for hospital entities
        print("\n[4/5] Checking for hospital entities...")
        hospital_count = db.query(HospitalEntity).count()
        
        if hospital_count == 0:
            print("  No hospital entities found. Creating sample hospital...")
            
            sample_hospital = HospitalEntity(
                name="General Hospital",
                code="GH-001",
                address="123 Medical Center Drive",
                phone="+1-555-0100",
                email="contact@generalhospital.com",
                is_active=True
            )
            db.add(sample_hospital)
            db.commit()
            
            print(f"✓ Sample hospital created: {sample_hospital.name} ({sample_hospital.code})")
        else:
            print(f"✓ Found {hospital_count} existing hospital entity/entities")
        
        # Migrate existing users if needed
        print("\n[5/5] Checking for legacy user profiles...")
        
        # Check for student profiles (legacy)
        try:
            result = db.execute(text("SELECT COUNT(*) FROM student_profiles")).scalar()
            if result > 0:
                print(f"  Found {result} legacy student profiles")
                print("  Note: Legacy student profiles should be migrated to client_profiles")
        except:
            pass
        
        # Check for teacher profiles (legacy)
        try:
            result = db.execute(text("SELECT COUNT(*) FROM teacher_profiles")).scalar()
            if result > 0:
                print(f"  Found {result} legacy teacher profiles")
                print("  Note: Legacy teacher profiles should be migrated to admin_profiles")
        except:
            pass
        
        print("\n" + "=" * 60)
        print("Migration completed successfully!")
        print("=" * 60)
        
        # Print summary
        print("\n📊 Database Summary:")
        print(f"  - Total Users: {db.query(User).count()}")
        print(f"  - Clients: {db.query(User).filter(User.role == 'client').count()}")
        print(f"  - Hospital Staff: {db.query(User).filter(User.role == 'hospital').count()}")
        print(f"  - Admins: {db.query(User).filter(User.role == 'admin').count()}")
        print(f"  - Hospital Entities: {db.query(HospitalEntity).count()}")
        print(f"  - Client Profiles: {db.query(ClientProfile).count()}")
        print(f"  - Hospital Staff Profiles: {db.query(HospitalStaff).count()}")
        print(f"  - Admin Profiles: {db.query(AdminProfile).count()}")
        print(f"  - Analysis Records: {db.query(AnalysisHistory).count()}")
        
        return True
        
    except Exception as e:
        print(f"\n✗ Error during migration: {e}")
        db.rollback()
        return False
    finally:
        db.close()


def create_test_data():
    """Create test data for development"""
    db = SessionLocal()
    
    try:
        print("\nCreating test data...")
        
        # Get or create hospital
        hospital = db.query(HospitalEntity).first()
        if not hospital:
            hospital = HospitalEntity(
                name="Test Hospital",
                code="TST-001",
                is_active=True
            )
            db.add(hospital)
            db.commit()
            db.refresh(hospital)
        
        # Create test client
        client_user = db.query(User).filter(User.email == "client@test.com").first()
        if not client_user:
            client_user = User(
                email="client@test.com",
                hashed_password=get_password_hash("client123"),
                role="client",
                name="Test Client",
                status="active"
            )
            db.add(client_user)
            db.commit()
            db.refresh(client_user)
            
            client_profile = ClientProfile(
                user_id=client_user.id,
                client_id="CLT-000001",
                organization="Test Organization"
            )
            db.add(client_profile)
            db.commit()
            print(f"✓ Created test client: client@test.com / client123")
        
        # Create test hospital staff
        staff_user = db.query(User).filter(User.email == "hospital@test.com").first()
        if not staff_user:
            staff_user = User(
                email="hospital@test.com",
                hashed_password=get_password_hash("hospital123"),
                role="hospital",
                name="Test Hospital Staff",
                status="active"
            )
            db.add(staff_user)
            db.commit()
            db.refresh(staff_user)
            
            staff_profile = HospitalStaff(
                user_id=staff_user.id,
                hospital_id=hospital.id,
                staff_id="STF-000001",
                department="Radiology",
                position="Radiologist"
            )
            db.add(staff_profile)
            db.commit()
            print(f"✓ Created test hospital staff: hospital@test.com / hospital123")
        
        # Assign client to hospital
        client_profile = db.query(ClientProfile).filter(ClientProfile.user_id == client_user.id).first()
        if client_profile:
            existing_assignment = db.query(HospitalClient).filter(
                HospitalClient.hospital_id == hospital.id,
                HospitalClient.client_id == client_profile.id
            ).first()
            
            if not existing_assignment:
                assignment = HospitalClient(
                    hospital_id=hospital.id,
                    client_id=client_profile.id,
                    is_active=True
                )
                db.add(assignment)
                db.commit()
                print(f"✓ Assigned test client to {hospital.name}")
        
        print("\n✓ Test data creation completed!")
        print("\nTest Accounts:")
        print("  Admin:    admin@diagnostichub.ai / admin123")
        print("  Client:   client@test.com / client123")
        print("  Hospital: hospital@test.com / hospital123")
        
    except Exception as e:
        print(f"Error creating test data: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Database migration script")
    parser.add_argument("--test-data", action="store_true", help="Create test data for development")
    args = parser.parse_args()
    
    success = run_migration()
    
    if success and args.test_data:
        create_test_data()
