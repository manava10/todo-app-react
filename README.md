# Todo App with Productivity Features

A full-stack Todo application with productivity features including Pomodoro timer, progress tracking, and task management.

## Features

- User Authentication (Signup/Login)
- Todo Management (Create, Read, Update, Delete)
- Priority Levels (Low, Medium, High)
- Categories and Tags
- Due Dates
- Pomodoro Timer with Custom Duration
- Progress Tracking
- Daily Goals
- Responsive Design

## Tech Stack

- Frontend: React, TypeScript, Styled Components
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: JWT

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone <your-repo-url>
cd todo-app
```

2. Install dependencies:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Create environment files:

For backend (server/.env):
```
NODE_ENV=development
PORT=5050
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:3000
```

For frontend (client/.env):
```
REACT_APP_API_URL=http://localhost:5050/api
```

4. Start the development servers:

```bash
# Start backend server
cd server
npm start

# Start frontend server
cd ../client
npm start
```

## Deployment

The application is configured for deployment on Vercel (frontend) and Railway (backend).

## License

MIT 