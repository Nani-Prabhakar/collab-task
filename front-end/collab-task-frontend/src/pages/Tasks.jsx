// src/pages/Tasks.jsx
import { useEffect, useState } from 'react';
import useAuthStore from '../store/authStore';
import { tasksAPI } from '../utils/api'; // Use centralized API utility

const Tasks = () => {
  const { user, token } = useAuthStore();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedTo: ''
  });

  const isManager = user?.role === 'manager';

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await tasksAPI.getAll();
      setTasks(data);
    } catch (err) {
      alert(err.message || 'Error loading tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: '',
      description: '',
      dueDate: '',
      assignedTo: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isManager) return;

    setSaving(true);
    try {
      if (editingId) {
        await tasksAPI.update(editingId, {
          ...form,
          dueDate: form.dueDate || null
        });
      } else {
        await tasksAPI.create({
          ...form,
          dueDate: form.dueDate || null
        });
      }
      resetForm();
      fetchTasks();
    } catch (err) {
      alert(err.message || 'Failed to save task');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setForm({
      title: task.title || '',
      description: task.description || '',
      dueDate: task.dueDate ? task.dueDate.substring(0, 10) : '',
      assignedTo: task.assignedTo?._id || ''
    });
  };

  const handleDelete = async (id) => {
    if (!isManager) return;
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
      await tasksAPI.delete(id);
      fetchTasks();
    } catch (err) {
      alert(err.message || 'Failed to delete task');
      console.error(err);
    }
  };

  const handleStatusChange = async (task, status) => {
    try {
      await tasksAPI.update(task._id, { status });
      fetchTasks();
    } catch (err) {
      alert(err.message || 'Failed to update status');
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Tasks
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage and track collaborative work.
          </p>
        </div>
      </div>

      {/* Manager task form */}
      {isManager && (
        <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              {editingId ? 'Edit task' : 'Create new task'}
            </h2>
            {editingId && (
              <button
                onClick={resetForm}
                className="text-xs text-gray-500 hover:underline"
                type="button"
              >
                Cancel edit
              </button>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="col-span-1">
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter task title"
              />
            </div>

            <div className="col-span-1">
              <label htmlFor="assignedTo" className="block text-sm font-medium mb-1">
                Assigned to (user ID)
              </label>
              <input
                id="assignedTo"
                name="assignedTo"
                value={form.assignedTo}
                onChange={handleChange}
                required
                placeholder="Paste user _id here"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                placeholder="Task details"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-1">
              <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
                Due date
              </label>
              <input
                id="dueDate"
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="col-span-1 flex items-end">
              <button
                type="submit"
                disabled={saving}
                className="w-full md:w-auto px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition disabled:opacity-60"
              >
                {saving ? 'Saving...' : editingId ? 'Update task' : 'Create task'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Task list */}
      <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">All tasks</h2>
          <span className="text-xs px-2 py-1 rounded-full bg-slate-50 dark:bg-slate-900/40 text-slate-600 dark:text-slate-300">
            {tasks.length} {tasks.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No tasks yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700 text-left text-gray-500 dark:text-gray-400">
                  <th className="py-2 pr-4">Title</th>
                  <th className="py-2 px-4">Assignee</th>
                  <th className="py-2 px-4">Status</th>
                  <th className="py-2 px-4">Due</th>
                  <th className="py-2 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr
                    key={task._id}
                    className="border-b border-gray-50 dark:border-gray-800"
                  >
                    <td className="py-2 pr-4">
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {task.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {task.description}
                      </div>
                    </td>
                    <td className="py-2 px-4 text-xs text-gray-600 dark:text-gray-300">
                      {task.assignedTo?.name || 'Unknown'}
                    </td>
                    <td className="py-2 px-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                          task.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300'
                            : 'bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300'
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 text-xs text-gray-500 dark:text-gray-400">
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : '-'}
                    </td>
                    <td className="py-2 px-4">
                      <div className="flex justify-end gap-2">
                        {(isManager || task.assignedTo?._id === user?.id) && (
                          <>
                            {task.status !== 'completed' && (
                              <button
                                onClick={() => handleStatusChange(task, 'completed')}
                                className="text-xs px-2 py-1 rounded bg-emerald-600 text-white"
                                aria-label={`Mark ${task.title} as done`}
                              >
                                Mark done
                              </button>
                            )}
                            {task.status === 'completed' && (
                              <button
                                onClick={() => handleStatusChange(task, 'pending')}
                                className="text-xs px-2 py-1 rounded bg-slate-600 text-white"
                                aria-label={`Mark ${task.title} as pending`}
                              >
                                Mark pending
                              </button>
                            )}
                          </>
                        )}

                        {isManager && (
                          <>
                            <button
                              onClick={() => handleEdit(task)}
                              className="text-xs px-2 py-1 rounded border border-gray-300 dark:border-gray-600"
                              aria-label={`Edit ${task.title}`}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(task._id)}
                              className="text-xs px-2 py-1 rounded bg-red-500 text-white"
                              aria-label={`Delete ${task.title}`}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
