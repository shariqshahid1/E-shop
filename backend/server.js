const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

console.log('Starting server.js...');
dotenv.config();
console.log('Dotenv configured.');

const startServer = async () => {
  console.log('Connecting to DB...');
  await connectDB();
  console.log('DB connection attempt finished.');

  const app = express();
  console.log('Express app initialized.');

  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(express.json());

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'Elite System Online', timestamp: new Date() });
  });

  app.use('/api/users', require('./routes/userRoutes'));
  app.use('/api/products', require('./routes/productRoutes'));
  app.use('/api/orders', require('./routes/orderRoutes'));
  app.use('/api/payment', require('./routes/paymentRoutes'));

  app.get('/', (req, res) => {
    res.send('Elite E-Shop API is running...');
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, '0.0.0.0', () => {
    console.log('==================================================');
    console.log(`🚀 ELITE BACKEND SERVER IS LIVE!`);
    console.log(`📡 Listening on: http://127.0.0.1:${PORT}`);
    console.log(`🔌 Health Check: http://127.0.0.1:${PORT}/api/health`);
    console.log('==================================================');
  });
};

startServer();
