// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from './store/authStore';
import App from './App.jsx';
import './index.css';

function AppWithAuth({ children }) {
  const initializeAuth = useAuthStore((s) => s.initializeAuth);
  
  useEffect(() => {
    initializeAuth();
  }, []);

  return children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppWithAuth>
        <App />
      </AppWithAuth>
    </BrowserRouter>
  </React.StrictMode>
);
