# Todo App with Productivity Features

A full-stack Todo application with productivity features including Pomodoro timer, progress tracking, and task management.

## Live Demo
[Frontend](https://your-vercel-url.vercel.app) | [Backend](https://your-railway-url.railway.app)

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
- Database: MongoDB Atlas
- Authentication: JWT
- Deployment: Vercel (Frontend), Railway (Backend)

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas Account
- npm or yarn
- Git

## Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/manava10/todo-app-react.git
cd todo-app-react
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

## Deployment Instructions

### Backend Deployment (Railway)

1. Create a Railway account and connect your GitHub repository
2. Set the root directory to `server`
3. Add the following environment variables:
   - `NODE_ENV=production`
   - `MONGODB_URI=your_mongodb_atlas_uri`
   - `JWT_SECRET=your_jwt_secret`
   - `CLIENT_URL=your_vercel_frontend_url`

### Frontend Deployment (Vercel)

1. Create a Vercel account and connect your GitHub repository
2. Set the root directory to `client`
3. Add the following environment variable:
   - `REACT_APP_API_URL=your_railway_backend_url`

## Project Structure

```
todo-app-react/
├── client/                 # Frontend React application
│   ├── public/            # Static files
│   └── src/               # React source files
│       ├── components/    # React components
│       └── config.ts      # Configuration
├── server/                # Backend Node.js application
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── index.js          # Server entry point
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Todos
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create a new todo
- `PATCH /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Manava - [GitHub](https://github.com/manava10)

The application is configured for deployment on Vercel (frontend) and Railway (backend).

## License

MIT 
