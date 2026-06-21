# 🗄️ Database Schema Documentation

PostgreSQL database schema for Wrist Fracture and Metal Detection System with Role-Based Access Control.

---

## Overview

The application uses PostgreSQL with SQLAlchemy ORM. The database follows a normalized structure with:
- User authentication
- Role-specific profiles (Client, Hospital Staff, Admin)
- Hospital entity management
- Client-Hospital assignments
- Analysis history tracking

---

## Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                        ROLE-BASED ACCESS CONTROL SCHEMA                              │
└─────────────────────────────────────────────────────────────────────────────────────┘

                                    ┌─────────────────────┐
                                    │       users         │
                                    ├─────────────────────┤
               ┌────────────────────│ id (PK) INTEGER     │────────────────────┐
               │                    │ email VARCHAR       │                    │
               │                    │ hashed_password     │                    │
               │                    │ role VARCHAR        │                    │
               │                    │ name VARCHAR        │                    │
               │                    │ status VARCHAR      │                    │
               │                    │ created_at DATETIME │                    │
               │                    │ updated_at DATETIME │                    │
               │                    └─────────────────────┘                    │
               │                              │                                │
    ┌──────────┴──────────┬─────────────────┼────────────────┬────────────────┴──────────┐
    │                     │                 │                │                           │
    ▼                     ▼                 ▼                ▼                           ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│ client_profiles │ │ hospital_staff  │ │ admin_profiles  │ │analysis_history │ │hospital_clients │
├─────────────────┤ ├─────────────────┤ ├─────────────────┤ ├─────────────────┤ │   (assigned_by) │
│ id (PK)         │ │ id (PK)         │ │ id (PK)         │ │ id (PK)         │ └─────────────────┘
│ user_id (FK)    │ │ user_id (FK)    │ │ user_id (FK)    │ │ user_id (FK)    │
│ client_id       │ │ hospital_id(FK) │ │ admin_id        │ │ hospital_id(FK) │
│ organization    │ │ staff_id        │ │ department      │ │ image_type      │
│ phone           │ │ department      │ │ access_level    │ │ original_file   │
│ address         │ │ position        │ └─────────────────┘ │ processed_file  │
└───────┬─────────┘ │ can_manage      │                     │ detections      │
        │           └────────┬────────┘                     │ created_at      │
        │                    │                              └─────────────────┘
        │                    │
        │           ┌────────┴────────┐
        │           │                 │
        │           ▼                 │
        │  ┌─────────────────┐        │
        │  │hospital_entities│        │
        │  ├─────────────────┤        │
        │  │ id (PK)         │◄───────┘
        │  │ name            │
        │  │ code            │
        │  │ address         │
        │  │ phone           │
        │  │ email           │
        │  │ is_active       │
        │  │ created_at      │
        │  └────────┬────────┘
        │           │
        │           │
        ▼           ▼
    ┌─────────────────────┐
    │  hospital_clients   │
    ├─────────────────────┤
    │ id (PK)             │
    │ hospital_id (FK)  ◄─┘
    │ client_id (FK)    ◄─────  (client_profiles.id)
    │ assigned_at         │
    │ assigned_by (FK)    │
    │ is_active           │
    │ notes               │
    └─────────────────────┘
```

---

## Tables

### 1. users

Primary user authentication table.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique identifier |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL, INDEXED | User email address |
| `hashed_password` | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| `role` | VARCHAR(50) | NOT NULL | User role (client/hospital/admin) |
| `name` | VARCHAR(255) | NULLABLE | User's full name |
| `status` | VARCHAR(20) | DEFAULT 'active' | Account status (active/inactive/suspended) |
| `created_at` | DATETIME | DEFAULT NOW() | Account creation timestamp |
| `updated_at` | DATETIME | ON UPDATE NOW() | Last update timestamp |

**SQL Definition:**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    name VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX ix_users_id ON users(id);
CREATE INDEX ix_users_email ON users(email);
```

---

### 2. client_profiles

Extended profile information for client users.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique identifier |
| `user_id` | INTEGER | UNIQUE, FK(users.id) | Reference to users table |
| `client_id` | VARCHAR(100) | UNIQUE, INDEXED | Client's institutional ID |
| `organization` | VARCHAR(255) | NULLABLE | Organization/Company name |
| `phone` | VARCHAR(20) | NULLABLE | Contact phone number |
| `address` | TEXT | NULLABLE | Address |

---

### 3. hospital_entities

Hospital organization entities.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique identifier |
| `name` | VARCHAR(255) | NOT NULL | Hospital name |
| `code` | VARCHAR(50) | UNIQUE, INDEXED | Hospital code (e.g., HSP-001) |
| `address` | TEXT | NULLABLE | Hospital address |
| `phone` | VARCHAR(20) | NULLABLE | Contact phone |
| `email` | VARCHAR(255) | NULLABLE | Contact email |
| `is_active` | BOOLEAN | DEFAULT TRUE | Active status |
| `created_at` | DATETIME | DEFAULT NOW() | Creation timestamp |
| `updated_at` | DATETIME | ON UPDATE NOW() | Last update timestamp |

---

### 4. hospital_staff

Hospital staff members (users with hospital role).

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique identifier |
| `user_id` | INTEGER | UNIQUE, FK(users.id) | Reference to users table |
| `hospital_id` | INTEGER | FK(hospital_entities.id) | Reference to hospital |
| `staff_id` | VARCHAR(100) | UNIQUE, INDEXED | Staff ID |
| `department` | VARCHAR(255) | NULLABLE | Department name |
| `position` | VARCHAR(100) | NULLABLE | Job position/title |
| `can_manage_clients` | BOOLEAN | DEFAULT TRUE | Can manage assigned clients |

---

### 5. hospital_clients

Many-to-many relationship between hospitals and clients.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique identifier |
| `hospital_id` | INTEGER | FK(hospital_entities.id) | Reference to hospital |
| `client_id` | INTEGER | FK(client_profiles.id) | Reference to client profile |
| `assigned_at` | DATETIME | DEFAULT NOW() | Assignment timestamp |
| `assigned_by` | INTEGER | FK(users.id), NULLABLE | Admin who made assignment |
| `is_active` | BOOLEAN | DEFAULT TRUE | Active assignment |
| `notes` | TEXT | NULLABLE | Assignment notes |

---

### 6. admin_profiles

Admin user profiles.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique identifier |
| `user_id` | INTEGER | UNIQUE, FK(users.id) | Reference to users table |
| `admin_id` | VARCHAR(100) | UNIQUE, INDEXED | Admin ID |
| `department` | VARCHAR(255) | NULLABLE | Department name |
| `access_level` | VARCHAR(50) | DEFAULT 'full' | Access level (full/limited) |

---

### 7. analysis_history

Track all image analyses.

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO INCREMENT | Unique identifier |
| `user_id` | INTEGER | FK(users.id) | User who performed analysis |
| `hospital_id` | INTEGER | FK(hospital_entities.id), NULLABLE | Associated hospital |
| `image_type` | VARCHAR(50) | | Type of image (xray, ct_scan) |
| `original_filename` | VARCHAR(255) | | Original file name |
| `processed_filename` | VARCHAR(255) | NULLABLE | Processed file name |
| `detections` | TEXT | NULLABLE | JSON string of detections |
| `created_at` | DATETIME | DEFAULT NOW() | Analysis timestamp |
| `notes` | TEXT | NULLABLE | Analysis notes |

---

## Role Permissions

### Client
- Upload and analyze images
- View own analysis history
- View educational resources

### Hospital Staff
- All client permissions
- View assigned clients
- View clients' analysis history
- Manage client records (if permitted)

### Admin
- All hospital staff permissions
- Manage all users (create, update, delete)
- Manage hospital entities
- Assign/unassign clients to hospitals
- Change user passwords
- View system analytics

---

## Database Configuration

### Connection String
```python
DATABASE_URL = "postgresql://username:password@localhost/uow"
```

### Connection Pool Settings
```python
engine = create_engine(
    DATABASE_URL,
    pool_size=5,
    max_overflow=10,
    pool_timeout=30
)
```

---

## Migration

### Running Migration
```bash
cd uow-backend
python dbupdate.py
```

### With Test Data
```bash
python dbupdate.py --test-data
```

This will create:
- Default admin: `admin@diagnostichub.ai` / `admin123`
- Test client: `client@test.com` / `client123`
- Test hospital staff: `hospital@test.com` / `hospital123`

---

## Common Queries

### Get User with Role-Specific Profile
```python
user = db.query(User).filter(User.email == email).first()
if user.role == "client":
    profile = db.query(ClientProfile).filter(
        ClientProfile.user_id == user.id
    ).first()
elif user.role == "hospital":
    staff = db.query(HospitalStaff).filter(
        HospitalStaff.user_id == user.id
    ).first()
    hospital = db.query(HospitalEntity).filter(
        HospitalEntity.id == staff.hospital_id
    ).first()
elif user.role == "admin":
    profile = db.query(AdminProfile).filter(
        AdminProfile.user_id == user.id
    ).first()
```

### Get Clients Assigned to a Hospital
```python
assignments = db.query(HospitalClient).filter(
    HospitalClient.hospital_id == hospital_id,
    HospitalClient.is_active == True
).all()

for assignment in assignments:
    client = db.query(ClientProfile).filter(
        ClientProfile.id == assignment.client_id
    ).first()
    user = db.query(User).filter(
        User.id == client.user_id
    ).first()
```

---

## Backup & Restore

### Backup
```bash
pg_dump -U postgres -d uow > backup.sql
```

### Restore
```bash
psql -U postgres -d uow < backup.sql
```

---

*Last Updated: December 2024*
