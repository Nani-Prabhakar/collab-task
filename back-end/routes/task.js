const express = require('express');
const Task = require('../models/task');
const ActivityLog = require('../models/ActivityLog');
const { auth, requireRole } = require('../middleware/auth');

const router = express.Router();

// All routes here require auth
router.use(auth);

// GET /api/tasks - tasks for logged-in user
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;

    let query = { assignedTo: userId };

    if (req.user.role === 'manager') {
      query = {
        $or: [{ assignedTo: userId }, { createdBy: userId }]
      };
    }

    const tasks = await Task.find(query)
      .populate('assignedTo', 'name email role')
      .populate('createdBy', 'name email role')
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    console.error('Get tasks error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/tasks - create task (manager only)
router.post('/', requireRole('manager'), async (req, res) => {
  try {
    const { title, description, dueDate, assignedTo } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      assignedTo,
      createdBy: req.user.id
    });

    await ActivityLog.create({
      action: 'created',
      user: req.user.id,
      task: task._id,
      details: { title: task.title }
    });

    res.status(201).json(task);
  } catch (err) {
    console.error('Create task error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/tasks/:id - update task
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: 'Task not found' });

    const isManager = req.user.role === 'manager';
    const isAssignee = String(task.assignedTo) === String(req.user.id);

    if (!isManager && !isAssignee) {
      return res
        .status(403)
        .json({ message: 'You cannot modify this task' });
    }

    if (isManager) {
      const { title, description, status, dueDate, assignedTo } = req.body;
      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;
      if (status !== undefined) task.status = status;
      if (dueDate !== undefined) task.dueDate = dueDate;
      if (assignedTo !== undefined) task.assignedTo = assignedTo;
    } else if (isAssignee) {
      if (req.body.status !== undefined) {
        task.status = req.body.status;
      } else {
        return res
          .status(400)
          .json({ message: 'Assignee can only update status' });
      }
    }

    await task.save();

    await ActivityLog.create({
      action: 'updated',
      user: req.user.id,
      task: task._id,
      details: req.body
    });

    res.json(task);
  } catch (err) {
    console.error('Update task error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/tasks/:id - delete task (manager only)
router.delete('/:id', requireRole('manager'), async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.deleteOne();

    await ActivityLog.create({
      action: 'deleted',
      user: req.user.id,
      task: task._id,
      details: { title: task.title }
    });

    res.json({ message: 'Task deleted' });
  } catch (err) {
    console.error('Delete task error', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
