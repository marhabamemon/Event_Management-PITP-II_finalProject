# Event Manager

A full-stack MERN application for managing events, including user authentication, event creation, booking, and admin features.

## Features

- User registration and login with JWT
- Role-based access (Admin, Organizer)
- Event listing with search, filter, and pagination
- Event creation and management for organizers
- Template system for event creation
- Admin dashboard for user and event management
- Responsive UI with plain CSS

## Tech Stack

- Backend: Node.js, Express, MongoDB, Mongoose
- Frontend: React, Vite, Redux Toolkit, Axios
- Authentication: JWT
- Deployment: Docker

## Getting Started

### Prerequisites

- Node.js
- MongoDB or Docker

### Installation

1. Clone the repository
2. Install backend dependencies: `cd backend && npm install`
3. Install frontend dependencies: `cd frontend && npm install`

### Running Locally

1. Start MongoDB
2. In backend: `npm run seed` to populate data
3. In backend: `npm run dev`
4. In frontend: `npm run dev`

### Running with Docker

`docker-compose up --build`

### Seed Credentials

- Admin: admin@example.com / Password123!
- Organizer: organizer@example.com / Password123!

## API Documentation

See backend/README.md for API endpoints.

## Project Structure

- backend/: Node.js API
- frontend/: React app

## License

MIT