import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { authAPI } from '../utils/api'; // ✅ MISSING IMPORT

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); // ✅ MISSING STATE
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  // ✅ MISSING handleChange FUNCTION
  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await authAPI.login(form);
      setAuth({ user: data.user, token: data.token });
      localStorage.setItem('token', data.token); // ✅ Added localStorage
      navigate('/');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white dark:bg-gray-800 rounded shadow p-6">
      <h1 className="text-2xl font-semibold mb-4">Login</h1>
      
      {/* ✅ Loading indicator */}
      {loading && (
        <div className="mb-4 p-3 bg-blue-100 text-blue-800 rounded text-sm">
          Logging in...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          disabled={loading} // ✅ Disable during loading
          className="w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-900 disabled:opacity-50"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          disabled={loading} // ✅ Disable during loading
          className="w-full px-3 py-2 rounded border bg-gray-50 dark:bg-gray-900 disabled:opacity-50"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium transition-colors"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <p className="mt-4 text-sm">
        No account?{' '}
        <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
