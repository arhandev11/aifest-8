# AI Fest 8 API Documentation

Base URL: `/api`

---

## Response Format

All responses follow a consistent JSON structure.

### Success Response
```json
{
  "info": "Success message",
  "meta": {},
  "data": { ... }
}
```

### Error Response
```json
{
  "info": "Error message",
  "meta": {},
  "errors": { ... }
}
```

### Validation Error Response (HTTP 400)
```json
{
  "info": "First validation error message",
  "meta": {},
  "errors": {
    "field_name": ["Error message"]
  }
}
```

---

## Authentication

### Login

Authenticates a user and returns an API token.

| | |
|---|---|
| **URL** | `POST /api/login` |
| **Auth** | None |
| **Content-Type** | `application/json` |

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| email | string | Yes | User email address |
| password | string | Yes | User password |

**Success Response (200):**
```json
{
  "info": "Berhasil login",
  "meta": {},
  "data": {
    "token": {
      "accessToken": { ... },
      "plainTextToken": "1|abc123..."
    },
    "user": {
      "id": 1,
      "name": "Admin",
      "email": "admin@example.com",
      ...
    }
  }
}
```

**Error Response (400):**
- `Pengguna tidak ditemukan` - User not found
- `Password yang diberikan Salah` - Invalid password

---

### Logout

Revokes the current access token.

| | |
|---|---|
| **URL** | `POST /api/logout` |
| **Auth** | Bearer Token |

**Success Response (200):**
```json
{
  "info": "Berhasil logout",
  "meta": {},
  "data": {}
}
```

---

## Lomba Individu (Individual Competition)

### List All Individual Registrations

Retrieves all individual competition registrations with optional filtering.

| | |
|---|---|
| **URL** | `GET /api/lomba-individu` |
| **Auth** | None |

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| search | string | No | Search by `nama` or `id` |
| jenis | string | No | Filter by competition type |

**Success Response (200):**
```json
{
  "info": "Berhasil mengambil data lomba",
  "meta": {},
  "data": {
    "lomba_individu": [
      {
        "id": "uuid-string",
        "nama": "Participant Name",
        "nama_arab": "Arabic Name",
        "usia": 15,
        "jenjang": "SMP",
        "instansi": "School Name",
        "email": "participant@email.com",
        "handphone": "08123456789",
        "jenis": "tahfidz",
        "bukti_bayar_url": "/storage/...",
        "story_1_url": "/storage/...",
        "story_2_url": "/storage/...",
        "twibbon_url": "/storage/...",
        "story_instagram_full_url": "http://domain.com/storage/...",
        "story_whatsapp_full_url": "http://domain.com/storage/...",
        "twibbon_full_url": "http://domain.com/storage/...",
        "created_at": "2024-11-30T00:00:00.000000Z",
        "updated_at": "2024-11-30T00:00:00.000000Z"
      }
    ]
  }
}
```

---

### Create Individual Registration

Registers a new participant for individual competition.

| | |
|---|---|
| **URL** | `POST /api/lomba-individu` |
| **Auth** | None |
| **Content-Type** | `multipart/form-data` |

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| nama | string | Yes | Participant full name |
| nama_arab | string | Yes | Participant name in Arabic |
| usia | integer | Yes | Participant age |
| jenjang | string | Yes | Education level (SD/SMP/SMA/Umum) |
| instansi | string | Yes | School/institution name |
| email | string | Yes | Email address |
| handphone | string | Yes | Phone number |
| jenis | string | Yes | Competition type |
| bukti_bayar | file | Yes | Payment proof (jpg, jpeg, png, pdf) |
| story_1 | file | Yes | Instagram story screenshot (jpg, jpeg, png, pdf) |
| story_2 | file | Yes | WhatsApp story screenshot (jpg, jpeg, png, pdf) |
| twibbon | file | Yes | Twibbon screenshot (jpg, jpeg, png, pdf) |

**Success Response (200):**
```json
{
  "info": "Berhasil membuat data lomba",
  "meta": {},
  "data": {
    "lomba_individu": {
      "id": "uuid-string",
      "nama": "Participant Name",
      ...
    }
  }
}
```

---

### Delete Individual Registration

Deletes an individual competition registration and its associated files.

| | |
|---|---|
| **URL** | `DELETE /api/lomba-individu/{id}` |
| **Auth** | None |

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | uuid | Registration UUID |

**Success Response (200):**
```json
{
  "info": "Berhasil menghapus data lomba",
  "meta": {},
  "data": {
    "result": true
  }
}
```

---

## Lomba Kelompok (Group Competition)

### List All Group Registrations

Retrieves all group competition registrations with optional filtering.

| | |
|---|---|
| **URL** | `GET /api/lomba-kelompok` |
| **Auth** | None |

**Query Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| search | string | No | Search by `nama` or `id` |
| jenis | string | No | Filter by competition type |

**Success Response (200):**
```json
{
  "info": "Berhasil mengambil data lomba",
  "meta": {},
  "data": {
    "lomba_kelompok": [
      {
        "id": "uuid-string",
        "nama_1": "Member 1 Name",
        "nama_arab_1": "Member 1 Arabic Name",
        "usia_1": 15,
        "instansi_1": "School Name",
        "nama_2": "Member 2 Name",
        "nama_arab_2": "Member 2 Arabic Name",
        "usia_2": 16,
        "instansi_2": "School Name",
        "nama_3": "Member 3 Name",
        "nama_arab_3": "Member 3 Arabic Name",
        "usia_3": 15,
        "instansi_3": "School Name",
        "jenjang": "SMP",
        "email": "group@email.com",
        "handphone": "08123456789",
        "jenis": "musabaqah",
        "bukti_bayar_url": "/storage/...",
        "story_1_url": "/storage/...",
        "story_2_url": "/storage/...",
        "twibbon_url": "/storage/...",
        "story_instagram_full_url": "http://domain.com/storage/...",
        "story_whatsapp_full_url": "http://domain.com/storage/...",
        "twibbon_full_url": "http://domain.com/storage/...",
        "created_at": "2024-11-30T00:00:00.000000Z",
        "updated_at": "2024-11-30T00:00:00.000000Z"
      }
    ]
  }
}
```

---

### Create Group Registration

Registers a new group (3 members) for group competition.

| | |
|---|---|
| **URL** | `POST /api/lomba-kelompok` |
| **Auth** | None |
| **Content-Type** | `multipart/form-data` |

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| nama_1 | string | Yes | Member 1 full name |
| nama_arab_1 | string | Yes | Member 1 name in Arabic |
| usia_1 | integer | Yes | Member 1 age |
| instansi_1 | string | Yes | Member 1 school/institution |
| nama_2 | string | Yes | Member 2 full name |
| nama_arab_2 | string | Yes | Member 2 name in Arabic |
| usia_2 | integer | Yes | Member 2 age |
| instansi_2 | string | Yes | Member 2 school/institution |
| nama_3 | string | Yes | Member 3 full name |
| nama_arab_3 | string | Yes | Member 3 name in Arabic |
| usia_3 | integer | Yes | Member 3 age |
| instansi_3 | string | Yes | Member 3 school/institution |
| jenjang | string | Yes | Education level (SD/SMP/SMA/Umum) |
| email | string | Yes | Contact email address |
| handphone | string | Yes | Contact phone number |
| jenis | string | Yes | Competition type |
| bukti_bayar | file | Yes | Payment proof (jpg, jpeg, png, pdf) |
| story_1 | file | Yes | Instagram story screenshot (jpg, jpeg, png, pdf) |
| story_2 | file | Yes | WhatsApp story screenshot (jpg, jpeg, png, pdf) |
| twibbon | file | Yes | Twibbon screenshot (jpg, jpeg, png, pdf) |

**Success Response (200):**
```json
{
  "info": "Berhasil membuat data lomba",
  "meta": {},
  "data": {
    "lomba_kelompok": {
      "id": "uuid-string",
      "nama_1": "Member 1 Name",
      ...
    }
  }
}
```

---

### Delete Group Registration

Deletes a group competition registration and its associated files.

| | |
|---|---|
| **URL** | `DELETE /api/lomba-kelompok/{id}` |
| **Auth** | None |

**URL Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| id | uuid | Registration UUID |

**Success Response (200):**
```json
{
  "info": "Berhasil menghapus data lomba",
  "meta": {},
  "data": {
    "result": true
  }
}
```

---

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Bad Request / Validation Error |
| 404 | Resource Not Found |
| 500 | Internal Server Error |

---

## File Upload Notes

- Accepted file types: `jpg`, `jpeg`, `png`, `pdf`
- Files are stored in the `public` disk
- Full URLs for uploaded files are provided via `story_instagram_full_url`, `story_whatsapp_full_url`, and `twibbon_full_url` attributes
