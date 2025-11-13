# Event Manager Backend

## Description

Backend API for Event Manager application built with Node.js, Express, and MongoDB.

## Features

- JWT Authentication with role-based access (admin, organizer)
- Event CRUD with search, filter, pagination
- Booking system with capacity checks
- File upload for event images
- Admin analytics

## Installation

1. Clone the repo
2. cd backend
3. npm install
4. Copy .env.example to .env and fill in values
5. npm run dev

## Scripts

- npm start: Start production server
- npm run dev: Start dev server with nodemon
- npm run seed: Seed database with sample data
- npm test: Run tests

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Events
- GET /api/events (public)
- POST /api/events (organizer/admin)
- GET /api/events/:id (public)
- PUT /api/events/:id (auth, owner)
- DELETE /api/events/:id (auth, owner)

### Bookings
- GET /api/bookings (auth)
- POST /api/bookings (auth)
- DELETE /api/bookings/:id (auth)

### Admin
- GET /api/admin/users (admin)
- DELETE /api/admin/users/:id (admin)
- GET /api/admin/analytics (admin)

## Seed Credentials

Admin: admin@example.com / Password123!
Organizer: organizer@example.com / Password123!