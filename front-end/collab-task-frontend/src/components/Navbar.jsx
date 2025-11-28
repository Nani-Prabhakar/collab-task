import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { useTheme } from '../context/ThemeContext';
import { useEffect } from 'react';
const Navbar = () => {
  const { user, clearAuth } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    localStorage.removeItem('token');
    navigate('/login');
  };
  // Add useEffect to check token on mount
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token && !user) {
    // Could fetch user profile here if needed
  }
}, []);

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <Link to="/" className="font-semibold text-lg text-gray-900 dark:text-gray-100">
        Collab Tasks
      </Link>
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100"
        >
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
        {user ? (
          <>
            <span className="text-sm text-gray-700 dark:text-gray-200">
              {user.name} ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm rounded bg-red-500 text-white"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm text-blue-600 dark:text-blue-400">
              Login
            </Link>
            <Link to="/signup" className="text-sm text-blue-600 dark:text-blue-400">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
