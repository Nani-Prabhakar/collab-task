
# 🚀 Collaborative Task Manager

A full-stack web application designed for efficient **team task coordination**, featuring authentication, role-based access, task creation/assignment, and real-time status tracking.  
This project aims to simplify team workflows by providing an intuitive dashboard and seamless task management experience.

---

## 📌 Features

- 🔐 **User Authentication (JWT)**
- 🧑‍💼 **Role-Based Access Control** (Manager & User)
- 📝 **Task Creation, Assignment & Editing**
- 📊 **Dashboard Overview**
- 🔄 **Real-time Task Status Updates**
- 🎨 **Modern & Responsive UI (React + Tailwind CSS)**

---

## 🛠️ Tech Stack

### **Frontend**
- React 18  
- Zustand (State Management)  
- React Router  
- Tailwind CSS  
- Vite  

### **Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  

---

## 📦 Project Structure

```

/project-root
│── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── .env.example
│   └── server.js
│
└── frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── store/
│   └── App.jsx
└── vite.config.js

````

---

## ⚙️ Backend Setup

```bash
cd backend
npm install

# Copy environment template
cp .env.example .env
````

Edit `.env` and add:

```
MONGO_URI=mongodb://localhost:27017/collab_task_manager
# or your MongoDB Atlas URI

JWT_SECRET=your-secure-jwt-secret-key
PORT=5000
```

Start backend:

```bash
npm run dev
```

---

## 🎨 Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

---

## 🌍 Environment Variables

### **Backend `.env`**

```
MONGO_URI=
JWT_SECRET=
PORT=5000
```

## ▶️ How to Run the Project

1. Start MongoDB (Local or Atlas)
2. Start Backend

   ```bash
   cd backend
   npm run dev
   ```
3. Start Frontend

   ```bash
   cd frontend
   npm run dev
   ```
4. Visit the app in browser:
   **[http://localhost:5173](http://localhost:5173)**

---

