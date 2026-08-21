import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoutes.js';

// Create express app and http server
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json({limit: '5mb'}));

// Routes
app.get('/', (req, res) => {res.send('Server is running');});
app.use('/api/auth', userRouter);

// Connect to MongoDB
await connectDB();

// Start the server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});