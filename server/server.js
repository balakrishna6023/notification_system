const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan'); // HTTP request logger
const authRoutes = require('./routes/auth');
const notificationRoutes = require('./routes/notifications');
const studentRoutes = require('./routes/student');
const adminRoutes = require('./routes/admin'); // Include the admin routes

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(morgan('dev')); // Log HTTP requests

// CORS configuration to allow requests from specific origin
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL if different
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow credentials to be included in requests
};

// Use CORS middleware with options
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON request bodies

// Handle preflight requests
app.options('*', cors(corsOptions));

// Define API routes
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/admin', adminRoutes); // Add this line for admin routes

// Set the port to listen on
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
}); 
