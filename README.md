
# Hotel Booking App

A full-stack application for hotel room booking management built with React, Node.js, and MongoDB.

## Features
- Room booking with guest details
- View booking details by email
- Current guest list view
- Booking modification capability

## Tech Stack
- Frontend: React, TypeScript, Tailwind CSS, React Query
- Backend: Node.js, Express, MongoDB
- Authentication: JWT (planned)

## Setup
1. Clone repository
```bash
git clone https://github.com/aakash-priyadarshi/hotel-booking-app
cd hotel-booking-app
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables: Create `.env` file
```
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

4. Run development servers
```bash
# Backend
npm run dev:server

# Frontend
npm run dev:client
```

## Project Structure
```
hotel-booking-app/
├── src/
│   ├── api/          # Frontend API integration
│   ├── components/   # React components
│   ├── hooks/        # Custom React hooks
│   ├── models/       # MongoDB schemas
│   └── routes/       # Backend API routes
```

## Running Test Cases
To run the test cases.

```
cd tests

go test -v
```
