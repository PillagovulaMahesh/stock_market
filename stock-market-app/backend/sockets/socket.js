// backend/sockets/socket.js

const socketIO = require('socket.io');
const { fetchRealTimeStockData } = require('../services/stockServices');

const setupSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: '*', // Replace with your frontend's URL in production
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Listen for requests to join specific stock rooms
    socket.on('joinStockRoom', (symbol) => {
      socket.join(symbol);
      console.log(`Client joined room: ${symbol}`);
    });

    // Listen for requests to leave specific stock rooms
    socket.on('leaveStockRoom', (symbol) => {
      socket.leave(symbol);
      console.log(`Client left room: ${symbol}`);
    });

    // Listen for a request to start receiving real-time stock updates
    socket.on('getRealTimeStockData', async (symbol) => {
      try {
        const stockData = await fetchRealTimeStockData(symbol);
        io.to(symbol).emit('stockDataUpdate', stockData); // Broadcast to the room
      } catch (error) {
        console.error(`Error fetching real-time data for ${symbol}:`, error.message);
        socket.emit('error', { message: 'Failed to fetch real-time stock data' });
      }
    });

    // Disconnect event
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  // Periodically broadcast updates (e.g., every minute)
  setInterval(async () => {
    const stockRooms = Object.keys(io.sockets.adapter.rooms);
    for (const symbol of stockRooms) {
      try {
        const stockData = await fetchRealTimeStockData(symbol);
        io.to(symbol).emit('stockDataUpdate', stockData);
      } catch (error) {
        console.error(`Error during periodic update for ${symbol}:`, error.message);
      }
    }
  }, 60000); // Update every 60 seconds
};

module.exports = setupSocket;
