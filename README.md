# Collaborative Task Manager 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node-18-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-brightgreen.svg)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-purple.svg)](https://tailwindcss.com/)

## 📖 Overview

**Collaborative Task Manager** is a full-stack web application built for team task management with role-based authentication. Managers can create, assign, edit, and delete tasks while regular users can view assigned tasks and update their status.

> **Live Demo**: https://collab-task-manager.vercel.app

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login/register with token persistence  
- 🎭 **Role-Based Access Control** — Manager vs User permissions  
- 📝 **Full Task CRUD** — Create, Read, Update, Delete  
- 📊 **Smart Dashboard** — Task analytics & personal task views  
- 📱 **Responsive UI** — Built with Tailwind + mobile-first layout  
- 🔄 **Real-time Updates** — Auto-refresh every 30 seconds  
- ⚡ **High Performance** — Vite + optimized API calls  

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, Vite, Tailwind CSS, React Router, Zustand |
| **Backend** | Node.js, Express.js, Mongoose |
| **Database** | MongoDB (Local/Atlas) |
| **Auth** | JWT Tokens |
| **Deployment** | Vercel / Railway / Render |

---

## 📁 Project Structure
collab-task-manager/
├── frontend/ # React + Vite
│ ├── src/
│ │ ├── pages/ # Login, Signup, Dashboard, Tasks
│ │ ├── store/ # Zustand store
│ │ ├── utils/ # API utilities
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── tailwind.config.js
│ └── package.json
│
├── backend/ # Node.js + Express
│ ├── models/ # User.js, Task.js
│ ├── routes/ # auth.js, tasks.js
│ ├── middleware/ # auth middleware
│ ├── server.js
│ └── package.json
│
├── screenshots/
│
├── README.md
└── .gitignore
## 🚀 Quick Setup (5 minutes)

### **Prerequisites**
```bash
# Install Node.js 18+
# Install MongoDB (Local or Atlas)
npm install -g nodemon   # optional
1. Clone Repository
git clone <your-repo-url>
cd collab-task-manager2. Backend Setup
cd backend
npm install
cp .env.example .env


Edit the .env file with your MongoDB URI, JWT_SECRET, and PORT.

Start backend:

npm run dev


Backend URL:

http://localhost:5000

3. Frontend Setup
cd ../frontend
npm install
npm run dev


Frontend URL:

http://localhost:5173

🔧 Environment Variables
Backend .env
MONGO_URI=mongodb://localhost:27017/collab_task_manager
# or MongoDB Atlas:
# MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/
JWT_SECRET=your-secret-key-here
PORT=5000

