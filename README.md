# Todo App with Productivity Features

A modern, full-stack Todo application with productivity features built using React, Node.js, Express, and MongoDB.

## 🌟 Live Demo
- New Link Deployed - https://manava10.github.io/todo-app-react/
- Frontend: [https://todo-app-react-aceyd6sfm-manava10s-projects.vercel.app](https://todo-app-react-aceyd6sfm-manava10s-projects.vercel.app)
- Backend API: [https://todo-app-react-production.up.railway.app](https://todo-app-react-production.up.railway.app)

## ✨ Features

### Core Features
- 🔐 User Authentication (Register/Login)
- ✅ Create, Read, Update, Delete (CRUD) operations for todos
- 🏷️ Categorize todos
- 🏷️ Add tags to todos
- ⭐ Set priority levels (Low, Medium, High)
- 📅 Set due dates for tasks
- 🔍 Filter todos by status, priority, and category

### Productivity Features
- ⏱️ Pomodoro Timer
  - 25-minute work sessions
  - 5-minute breaks
  - Customizable timer duration
  - Visual timer display
- 📊 Progress Tracking
  - Overall progress bar
  - Daily goal tracker
  - Visual completion indicators
- 📈 Task Analytics
  - Task completion statistics
  - Daily/weekly progress
  - Category-wise distribution

## 🛠️ Tech Stack

### Frontend
- React.js
- TypeScript
- Styled Components
- React Router
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt for password hashing

### Deployment
- Frontend: Vercel
- Backend: Railway
- Database: MongoDB Atlas

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/todo-app-react.git
   cd todo-app-react
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   # Create .env file with the following variables:
   # MONGODB_URI=your_mongodb_uri
   # JWT_SECRET=your_jwt_secret
   # PORT=5050
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd client
   npm install
   # Create .env file with:
   # REACT_APP_API_URL=http://localhost:5050
   npm start
   ```

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Todos
- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create new todo
- `PATCH /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## 🔒 Security Features
- Password hashing using bcrypt
- JWT-based authentication
- Protected routes
- Input validation
- CORS configuration
- Environment variable protection

## 🎨 UI/UX Features
- Responsive design
- Modern and clean interface
- Intuitive navigation
- Real-time updates
- Loading states
- Error handling
- Form validation

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables
4. Deploy

### Backend (Railway)
1. Push code to GitHub
2. Connect repository to Railway
3. Configure environment variables
4. Deploy

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author
- GitHub: [@manava10](https://github.com/manava10)

## 🙏 Acknowledgments
- React.js community
- Express.js documentation
- MongoDB documentation
- Railway and Vercel for hosting 
