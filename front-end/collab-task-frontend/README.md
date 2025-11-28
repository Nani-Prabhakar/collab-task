# Collaborative Task Manager 🚀

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-green.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18-blue.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green.svg)](https://mongodb.com/)

**Collaborative Task Manager** is a full-stack web application for team task management with role-based authentication. Managers can create, edit, delete tasks and assign them to users. Users can view assigned tasks and update their status.

## ✨ Features

- 🔐 **User Authentication** - Register, Login with JWT tokens
- 🎭 **Role-Based Access** - Manager (create/edit/delete) vs User (update status)
- 📝 **Task Management** - Create, Edit, Delete, Mark Complete/Pending
- 📊 **Dashboard Analytics** - Task stats, assigned/created tasks overview
- 📱 **Responsive Design** - Mobile-first with dark mode support
- 🔄 **Real-time Updates** - Auto-refresh dashboard every 30s
- 🌙 **Dark Mode** - Tailwind CSS powered theming

## 🛠 Tech Stack

| Frontend | Backend | Database | State | Styling |
|----------|---------|----------|-------|---------|
| React 18 | Node.js | MongoDB | Zustand | Tailwind CSS |
| Vite | Express.js | Mongoose | React Router | |

## 📁 Project Structure

collab-task-manager/
├── frontend/
│ ├── src/
│ │ ├── pages/ # Login, Signup, Dashboard, Tasks
│ │ ├── store/ # Zustand auth store
│ │ ├── utils/ # API utilities
│ │ ├── App.jsx # Router setup
│ │ └── main.jsx # Entry point
│ ├── package.json
│ └── tailwind.config.js
├── backend/
│ ├── models/ # User, Task schemas
│ ├── routes/ # auth.js, tasks.js
│ ├── server.js
│ └── package.json
└── README.md


## 🚀 Quick Start

### Prerequisites

- Node.js **v18+**
- npm **v9+**
- MongoDB (local or [Atlas cloud](https://mongodb.com/atlas))

### Backend Setup

cd backend
npm install
cp .env.example .env

Edit .env with your MongoDB URI
npm run dev

**Backend runs on:** `http://localhost:5000`

### Frontend Setup

cd frontend
npm install
npm run dev

**Frontend runs on:** `http://localhost:5173`

## 🔧 Environment Variables

### Backend `.env`

MONGO_URI=mongodb://localhost:27017/collab_task_manager

OR MongoDB Atlas: mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
PORT=5000

