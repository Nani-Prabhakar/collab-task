```markdown
# Collaborative Task Manager

<div align="center">

[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green?style=for-the-badge&logo=mongodb)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-blue?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

</div>

## 🚀 Project Overview

**Collaborative Task Manager** is a modern full-stack web application designed for seamless team task coordination. It provides user authentication, role-based access control (Managers & Users), task creation/assignment/editing, real-time status tracking, and an intuitive dashboard for project oversight. [web:5][web:10][memory:1]

Built with cutting-edge technologies, this app ensures scalability, security, and exceptional user experience for teams of all sizes.

## 🛠️ Tech Stack

| Frontend | Backend | Database | Authentication |
|----------|---------|----------|----------------|
| React 18 | Node.js | MongoDB | JWT Tokens |
| Zustand | Express.js | Mongoose | bcryptjs |
| React Router | | Atlas/Local |  |
| Tailwind CSS | | |  |
| Vite | | |  | [web:13][web:16]

## ✨ Features

- 🔐 Secure user authentication & authorization
- 👥 Role-based access (Managers/Users)
- 📝 Task CRUD operations with assignment
- 📊 Real-time dashboard analytics
- ⚡ Fast development with Vite & Nodemon
- 🛡️ Production-ready security (Helmet, Rate Limiting)
- 📱 Responsive design with Tailwind CSS [memory:1][memory:2]

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ [web:10]
- MongoDB (Local or Atlas)
- Git

### 1. Clone & Install

```
git clone <your-repo-url>
cd collaborative-task-manager
```

### 2. Backend Setup

```
cd backend
npm install
cp .env.example .env
```

**Update `.env`:**
```
MONGO_URI=mongodb://localhost:27017/collab_task_manager
# or your MongoDB Atlas URI
JWT_SECRET=your-super-secure-jwt-secret-here
PORT=5000
```

```
npm run dev
```
*Backend runs on http://localhost:5000*

### 3. Frontend Setup

```
cd ../frontend
npm install
npm run dev
```
*Frontend runs on http://localhost:5173*

## 📁 Project Structure

```
collaborative-task-manager/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── stores/
│   │   ├── pages/
│   │   └── App.jsx
│   ├── .env.example
│   └── package.json
└── README.md
```

## 🔧 Available Scripts

| Command | Location | Description |
|---------|----------|-------------|
| `npm run dev` | Backend | Start with Nodemon |
| `npm run dev` | Frontend | Vite dev server |
| `npm run build` | Frontend | Production build |
| `npm run lint` | Both | Code quality check | [web:10]

## 🌐 Environment Variables

### Backend `.env.example`
```
MONGO_URI=mongodb://localhost:27017/collab_task_manager
JWT_SECRET=your-super-secure-random-jwt-secret
PORT=5000
NODE_ENV=development
```

### Frontend `.env.example`
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME="Collaborative Task Manager"
```

## 📚 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | User registration | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/tasks` | Get all tasks | Yes |
| POST | `/api/tasks` | Create task | Yes |
| PUT | `/api/tasks/:id` | Update task | Yes |

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request [web:9]

## 📄 License

This project is open source and available under the MIT License. [web:9]

## 👥 Support

- Found a bug? [Open an issue](https://github.com/yourusername/collaborative-task-manager/issues)
- Need help? Join our [Discord community](https://discord.gg/your-discord)

---

<div align="center">

**Built with ❤️ for collaborative teams**  
*Last updated: November 28, 2025*

</div> [web:8][web:15]
```
