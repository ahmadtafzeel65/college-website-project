# College Website (MERN) — SRS Implementation

This repository implements the **Software Requirements Specification (SRS)** for a College Website with Admin CRUD operations.


<img width="387" height="344" alt="img2" src="https://github.com/user-attachments/assets/51ca9bf6-bc66-4bd8-acaa-69dfe9ae0ac6" />
<img width="248" height="331" alt="courses" src="https://github.com/user-attachments/assets/e5962ed8-9890-426b-aaa3-c797a4fb9b17" />
<img width="308" height="277" alt="login" src="https://github.com/user-attachments/assets/fdce3734-7397-4e43-a730-705ba3820f94" />
<img width="385" height="347" alt="dashboard" src="https://github.com/user-attachments/assets/3cfc5863-f88e-4ab1-ac15-5ee1f07ea80a" />

## Tech Stack
- **Frontend**: React (Vite), React Router, Axios
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT Auth
- **Auth**: Auto-created admin on first server start

## Quick Start

### 1) Backend
```bash
cd server
cp .env.example .env
# edit .env if needed (Mongo URL, JWT, etc.)
npm install
npm run dev
```

### 2) Frontend
```bash
cd client
cp .env.example .env
npm install
npm run dev
```

- Frontend dev server: http://localhost:5173
- Backend API: http://localhost:5000
- Default admin (auto-created): `admin@college.com` / `admin123`

## Features (per SRS)

### Public Landing Page
- About, Departments, Courses, Contact form (view-only data).
- Data is fetched from `/api/departments` and `/api/courses`.
- Contact form posts to `/api/contacts`.

### Admin Authentication
- `/api/auth/login` returns a JWT.
- Admin user is auto-created on server start if not present using `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- No registration endpoints.

### CRUD (Admin Only)
- Departments: `GET /api/departments` (public), `POST/PUT/DELETE` (admin only).
- Courses: `GET /api/courses` (public), `POST/PUT/DELETE` (admin only).
- Contacts: `POST /api/contacts` (public submit), `GET /api/contacts` (admin only).

### Non-Functional
- MERN stack used.
- Clean, simple, responsive UI baseline; customize as needed.
- Password stored securely with bcrypt hash.
- Ready for GitHub deployment; add a live deployment if desired.

### Notes
- For production, configure CORS, environment variables, and secure JWT secret.
- Consider adding pagination, input validation, and nicer UI.
