import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // for navigation
import useAuthStore from '../store/authStore';
import { tasksAPI } from '../utils/api'; // your API utility that has tasksAPI methods

const Dashboard = () => {
  const { user, token, clearAuth } = useAuthStore(); // Add clearAuth here to logout
  const navigate = useNavigate(); // Initialize navigate function

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await tasksAPI.getAll();
      setTasks(data);
    } catch (err) {
      if (err.message?.toLowerCase().includes('token')) {
        clearAuth();
        navigate('/login');
      }
      alert(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  // Fetch tasks on token change also auto-refresh every 30s
  useEffect(() => {
    if (token) {
      fetchTasks();
      const interval = setInterval(fetchTasks, 30000);
      return () => clearInterval(interval);
    }
  }, [token]);

  const assignedTasks = useMemo(
    () => tasks.filter((t) => t.assignedTo && t.assignedTo._id === user?.id),
    [tasks, user]
  );

  const createdTasks = useMemo(
    () => tasks.filter((t) => t.createdBy && t.createdBy._id === user?.id),
    [tasks, user]
  );

  const completedCount = useMemo(
    () => tasks.filter((t) => t.status === 'completed').length,
    [tasks]
  );

  const pendingCount = useMemo(
    () => tasks.filter((t) => t.status !== 'completed').length,
    [tasks]
  );


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Welcome back, {user?.name}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Overview of your collaborative tasks.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total tasks
          </p>
          <p className="mt-2 text-2xl font-semibold">{tasks.length}</p>
        </div>
        <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Completed
          </p>
          <p className="mt-2 text-2xl font-semibold text-emerald-500">
            {completedCount}
          </p>
        </div>
        <div className="rounded-xl bg-white dark:bg-gray-800 p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Pending
          </p>
          <p className="mt-2 text-2xl font-semibold text-amber-500">
            {pendingCount}
          </p>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Loading tasks...
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Assigned tasks */}
          <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold">
                Assigned to you
              </h2>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
                {assignedTasks.length} tasks
              </span>
            </div>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {assignedTasks.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No tasks assigned yet.
                </p>
              ) : (
                assignedTasks.map((task) => (
                  <div
                    key={task._id}
                    className="rounded-lg border border-gray-100 dark:border-gray-700 p-3 flex justify-between items-start"
                  >
                    <div>
                      <p className="font-medium text-sm">
                        {task.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {task.description}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        task.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300'
                          : 'bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300'
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Created tasks (for managers) */}
          {user?.role === 'manager' && (
            <div className="rounded-xl bg-white dark:bg-gray-800 p-5 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">
                  Tasks you created
                </h2>
                <span className="text-xs px-2 py-1 rounded-full bg-slate-50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300">
                  {createdTasks.length} tasks
                </span>
              </div>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {createdTasks.length === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    You have not created any tasks yet.
                  </p>
                ) : (
                  createdTasks.map((task) => (
                    <div
                      key={task._id}
                      className="rounded-lg border border-gray-100 dark:border-gray-700 p-3"
                    >
                      <p className="font-medium text-sm">
                        {task.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Assigned to:{' '}
                        {task.assignedTo?.name || 'Unknown'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Status: {task.status}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;