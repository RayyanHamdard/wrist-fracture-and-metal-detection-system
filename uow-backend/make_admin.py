"""
Create a new admin account, or promote/reset an existing user to admin.

Run from the uow-backend/ folder (with your .env / DATABASE_URL set):

    python make_admin.py                         # uses the defaults below
    python make_admin.py you@example.com pass123 # custom email + password

It reuses the app's own password hashing, so the new login works immediately.
"""
import sys
from app.main import SessionLocal, User, AdminProfile, get_password_hash

email = sys.argv[1] if len(sys.argv) > 1 else "rayyansiddiqui@gmail.com"
password = sys.argv[2] if len(sys.argv) > 2 else "admin123"

db = SessionLocal()
try:
    user = db.query(User).filter(User.email == email).first()
    if user:
        user.hashed_password = get_password_hash(password)
        user.role = "admin"
        user.status = "active"
        action = "Updated existing user to admin"
    else:
        user = User(
            email=email,
            hashed_password=get_password_hash(password),
            role="admin",
            name="Administrator",
            status="active",
        )
        db.add(user)
        action = "Created new admin user"
    db.commit()
    db.refresh(user)

    profile = db.query(AdminProfile).filter(AdminProfile.user_id == user.id).first()
    if not profile:
        db.add(AdminProfile(
            user_id=user.id,
            admin_id=f"ADM-{user.id:06d}",
            department="IT",
            access_level="full",
        ))
        db.commit()

    print(f"{action}.")
    print(f"  Email:    {email}")
    print(f"  Password: {password}")
    print("You can now sign in with these credentials.")
finally:
    db.close()
