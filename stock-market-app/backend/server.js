// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const socketIo = require('socket.io');
const http = require('http');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const stockRoutes = require('./routes/stocks');
const tradeRoutes = require('./routes/trades');
const watchlistRoutes = require('./routes/watchlist');

// Initialize express app
const app = express();

// Create HTTP server for Socket.io integration
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server, {
  cors: {
    origin: "*", // You can restrict this to your frontend's domain
    methods: ["GET", "POST"],
  },
});

// Socket.io logic (example)
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Example of listening to a custom event
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`Client ${socket.id} joined room ${room}`);
  });

  // Example of sending a message to clients in a room
  socket.on('sendMessage', (message) => {
    io.to(message.room).emit('messageReceived', message);
  });

  // Handle client disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests
app.use(morgan('dev')); // HTTP request logger

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/trades', tradeRoutes);
app.use('/api/watchlist', watchlistRoutes);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
