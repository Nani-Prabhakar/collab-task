# Collaborative Task Manager

## Project Summary  
Collaborative Task Manager is a full-stack web application for effective team task coordination. It supports user authentication, role-based access (managers and users), task creation/assignment/editing, status tracking, and a dashboard overview. The frontend is built with React and Zustand, while the backend uses Node.js, Express, and MongoDB.

---

## Tech Stack  
- **Frontend:** React 18, Zustand, React Router, Tailwind CSS, Vite  
- **Backend:** Node.js, Express.js, Mongoose  
- **Database:** MongoDB (local or Atlas)  
- **Authentication:** JWT tokens  

---


## Setup Instructions

### Backend Setup
cd backend
npm install
cp .env.example .env

**Edit .env and add your MongoDB URI and JWT secret**
npm run dev

### Frontend Setup

cd ../frontend
npm install
npm run dev


### Environment Variables

#### Backend `.env`

MONGO_URI=mongodb://localhost:27017/collab_task_manager

or **your MongoDB Atlas connection string**

JWT_SECRET=your-secure-jwt-secret-key
PORT=5000

---

## How to Run the Project

1. Start MongoDB (local or Atlas)
2. Run backend:  
cd backend
npm run dev
3. Run frontend:  
cd frontend
npm run dev

 

