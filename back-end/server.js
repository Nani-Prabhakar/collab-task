
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');


const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

const app = express();

// basic middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// basic rate limiting for all /api routes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutes
  max: 100                    // limit each IP to 100 requests per window
});
app.use('/api', limiter); 

// connect to MongoDB
const MONGO_URI = process.env.MONGO_URI ;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err)); 

// mount routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
