# 🔌 API Documentation

Wrist Fracture and Metal Detection System Backend API with Role-Based Access Control

---

## Base URL

```
http://localhost:8000
```

---

## Authentication

All protected endpoints require a JWT Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

---

## Public Endpoints

### POST /signup

Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "role": "client",
  "name": "John Doe",
  "clientId": "CLT-001",        // optional, for clients
  "organization": "Acme Inc",    // optional, for clients
  "hospitalId": "STF-001",       // optional, for hospital staff
  "hospitalEntityId": 1,         // optional, for hospital staff
  "department": "Radiology",     // optional
  "position": "Doctor",          // optional, for hospital staff
  "adminId": "ADM-001",          // optional, for admins
  "accessLevel": "full"          // optional, for admins
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user_id": 1
}
```

---

### POST /token

Login and get access token.

**Request Body (form-data):**
```
username: user@example.com
password: securepassword
role: client (optional)
```

**Response:**
```json
{
  "access_token": "eyJ...",
  "token_type": "bearer",
  "role": "client",
  "user_id": 1
}
```

---

## Protected Endpoints (All Roles)

### GET /user/info

Get current user information.

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "role": "client"
}
```

---

### GET /profile

Get user profile with role-specific information.

**Response (Client):**
```json
{
  "id": 1,
  "role": "client",
  "email": "client@example.com",
  "name": "John Doe",
  "client_id": "CLT-001",
  "organization": "Acme Inc",
  "phone": "+1-555-0100",
  "address": "123 Main St"
}
```

**Response (Hospital Staff):**
```json
{
  "id": 2,
  "role": "hospital",
  "email": "staff@hospital.com",
  "name": "Dr. Jane Smith",
  "staff_id": "STF-001",
  "department": "Radiology",
  "position": "Senior Radiologist",
  "hospital_name": "General Hospital",
  "hospital_id": 1
}
```

---

### POST /analysis/record

Record an analysis in history.

**Request Body (form-data):**
```
image_type: xray
original_filename: scan.jpg
processed_filename: scan_processed.jpg (optional)
detections: {"fractures": [...]} (optional)
notes: Additional notes (optional)
```

---

### GET /analysis/history

Get user's analysis history.

**Query Parameters:**
- `skip`: Number of records to skip (default: 0)
- `limit`: Maximum records to return (default: 20)

**Response:**
```json
[
  {
    "id": 1,
    "image_type": "xray",
    "original_filename": "scan.jpg",
    "processed_filename": "scan_processed.jpg",
    "detections": "{...}",
    "created_at": "2024-12-21T10:30:00",
    "notes": null
  }
]
```

---

## Admin Endpoints

All admin endpoints require `role: admin`.

### GET /admin/dashboard/stats

Get dashboard statistics.

**Response:**
```json
{
  "total_users": 100,
  "total_clients": 80,
  "total_hospitals": 15,
  "total_admins": 5,
  "total_hospital_entities": 10,
  "total_analyses": 500,
  "active_users": 95,
  "inactive_users": 5
}
```

---

### GET /admin/users

List all users with optional filters.

**Query Parameters:**
- `role`: Filter by role (client/hospital/admin)
- `status`: Filter by status (active/inactive/suspended)
- `search`: Search by email or name
- `skip`: Pagination offset (default: 0)
- `limit`: Page size (default: 50, max: 100)

**Response:**
```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "client",
    "status": "active",
    "created_at": "2024-12-21T10:00:00"
  }
]
```

---

### GET /admin/users/{user_id}

Get detailed user information.

**Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "role": "client",
  "status": "active",
  "created_at": "2024-12-21T10:00:00",
  "updated_at": "2024-12-21T10:00:00",
  "profile": {
    "client_id": "CLT-001",
    "organization": "Acme Inc"
  }
}
```

---

### POST /admin/users

Create a new user (admin only).

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "securepassword",
  "name": "Jane Doe",
  "role": "client",
  "status": "active",
  "client_id": "CLT-002",
  "organization": "Tech Corp"
}
```

---

### PUT /admin/users/{user_id}

Update user information.

**Request Body:**
```json
{
  "email": "updated@example.com",
  "name": "Updated Name",
  "status": "inactive"
}
```

---

### PUT /admin/users/{user_id}/password

Change a user's password.

**Request Body:**
```json
{
  "new_password": "newsecurepassword"
}
```

---

### DELETE /admin/users/{user_id}

Delete a user.

---

### GET /admin/hospitals

List all hospital entities.

**Query Parameters:**
- `is_active`: Filter by active status
- `search`: Search by name or code
- `skip`: Pagination offset
- `limit`: Page size

**Response:**
```json
[
  {
    "id": 1,
    "name": "General Hospital",
    "code": "GH-001",
    "email": "contact@gh.com",
    "is_active": true,
    "staff_count": 10,
    "client_count": 50
  }
]
```

---

### GET /admin/hospitals/{hospital_id}

Get detailed hospital information including staff and clients.

**Response:**
```json
{
  "id": 1,
  "name": "General Hospital",
  "code": "GH-001",
  "address": "123 Medical Drive",
  "phone": "+1-555-0100",
  "email": "contact@gh.com",
  "is_active": true,
  "created_at": "2024-12-21T10:00:00",
  "staff": [
    {
      "id": 1,
      "user_id": 2,
      "name": "Dr. Smith",
      "email": "smith@gh.com",
      "staff_id": "STF-001",
      "department": "Radiology",
      "position": "Radiologist"
    }
  ],
  "clients": [
    {
      "assignment_id": 1,
      "client_profile_id": 1,
      "user_id": 3,
      "name": "John Patient",
      "email": "patient@example.com",
      "client_id": "CLT-001",
      "assigned_at": "2024-12-21T10:00:00"
    }
  ]
}
```

---

### POST /admin/hospitals

Create a new hospital entity.

**Request Body:**
```json
{
  "name": "New Hospital",
  "code": "NH-001",
  "address": "456 Health Ave",
  "phone": "+1-555-0200",
  "email": "contact@nh.com"
}
```

---

### PUT /admin/hospitals/{hospital_id}

Update hospital information.

---

### DELETE /admin/hospitals/{hospital_id}

Delete a hospital entity (only if no staff assigned).

---

### POST /admin/assignments

Assign a client to a hospital.

**Request Body:**
```json
{
  "client_id": 1,
  "hospital_id": 1,
  "notes": "Referred by Dr. Smith"
}
```

---

### DELETE /admin/assignments/{assignment_id}

Remove a client from a hospital.

---

### GET /admin/clients/unassigned

Get list of clients not assigned to any hospital.

**Response:**
```json
[
  {
    "client_profile_id": 1,
    "user_id": 3,
    "client_id": "CLT-001",
    "name": "John Doe",
    "email": "john@example.com",
    "organization": "Acme Inc"
  }
]
```

---

### GET /admin/analyses

List all analyses with filters.

**Query Parameters:**
- `user_id`: Filter by user
- `hospital_id`: Filter by hospital
- `image_type`: Filter by type (xray, ct_scan)
- `skip`: Pagination offset
- `limit`: Page size

---

## Hospital Staff Endpoints

All hospital endpoints require `role: hospital`.

### GET /hospital/dashboard/stats

Get hospital dashboard statistics.

**Response:**
```json
{
  "total_clients": 50,
  "total_analyses": 200,
  "analyses_this_month": 25,
  "hospital_name": "General Hospital"
}
```

---

### GET /hospital/clients

List clients assigned to the hospital.

**Query Parameters:**
- `search`: Search by name, email, or client ID
- `skip`: Pagination offset
- `limit`: Page size

**Response:**
```json
[
  {
    "client_profile_id": 1,
    "user_id": 3,
    "client_id": "CLT-001",
    "name": "John Doe",
    "email": "john@example.com",
    "organization": "Acme Inc",
    "assigned_at": "2024-12-21T10:00:00",
    "total_analyses": 15
  }
]
```

---

### GET /hospital/clients/{client_profile_id}

Get detailed client information and analysis history.

**Response:**
```json
{
  "client_profile_id": 1,
  "user_id": 3,
  "client_id": "CLT-001",
  "name": "John Doe",
  "email": "john@example.com",
  "organization": "Acme Inc",
  "phone": "+1-555-0300",
  "address": "789 Patient St",
  "assigned_at": "2024-12-21T10:00:00",
  "analyses": [
    {
      "id": 1,
      "image_type": "xray",
      "original_filename": "scan.jpg",
      "created_at": "2024-12-21T11:00:00",
      "detections": "{...}"
    }
  ]
}
```

---

### GET /hospital/clients/{client_profile_id}/analyses

Get analysis history for a specific client.

**Query Parameters:**
- `skip`: Pagination offset
- `limit`: Page size

---

### GET /hospital/profile

Get current hospital staff profile and hospital info.

**Response:**
```json
{
  "user": {
    "id": 2,
    "email": "staff@hospital.com",
    "name": "Dr. Jane Smith",
    "role": "hospital"
  },
  "staff": {
    "id": 1,
    "staff_id": "STF-001",
    "department": "Radiology",
    "position": "Senior Radiologist",
    "can_manage_clients": true
  },
  "hospital": {
    "id": 1,
    "name": "General Hospital",
    "code": "GH-001",
    "address": "123 Medical Drive",
    "phone": "+1-555-0100",
    "email": "contact@gh.com"
  }
}
```

---

## X-Ray Analysis Endpoints

### POST /xray/upload

Upload and analyze an X-ray image.

**Request Body (multipart/form-data):**
```
file: <image file>
```

**Response:**
```json
{
  "filename": "abc123.jpg",
  "detections": [
    {
      "class": "fracture",
      "confidence": 0.95,
      "bbox": [100, 200, 300, 400]
    }
  ],
  "processed_image": "abc123_processed.png"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Invalid input"
}
```

### 401 Unauthorized
```json
{
  "detail": "Could not validate credentials"
}
```

### 403 Forbidden
```json
{
  "detail": "Admin access required"
}
```

### 404 Not Found
```json
{
  "detail": "User not found"
}
```

---

*Last Updated: December 2024*
