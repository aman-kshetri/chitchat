import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';
import { Server } from 'socket.io';
import userRouter from './routes/userRoutes.js';
import messageRouter from './routes/messageRoutes.js';

// Create express app and http server
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO server
export const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Store online users
export const userSocketMap = {}; // { userId: socketId }

// Handle socket connections
io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;
  console.log('A user connected:', userId);

  if (userId) {
    userSocketMap[userId] = socket.id;

    // Emit online users to all connected clients
    const onlineUsers = Object.keys(userSocketMap);
    io.emit('onlineUsers', onlineUsers);
    socket.emit('onlineUsers', onlineUsers);

    socket.on('disconnect', () => {
      console.log('User disconnected', userId);
      delete userSocketMap[userId];
      const updatedUsers = Object.keys(userSocketMap);
      io.emit('onlineUsers', updatedUsers);
    });
  }
});

// Middleware
app.use(cors());
app.use(express.json({limit: '5mb'}));

// Routes
app.get('/', (req, res) => {res.send('Server is running');});
app.use('/api/auth', userRouter);
app.use('/api/messages', messageRouter);

// Connect to MongoDB
await connectDB();

// Start the server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});