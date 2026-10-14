import express, { Request, Response, Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectDB from './config/database.js';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/authRoutes.js';
import trackingRoutes from './routes/trackingRoutes.js';
import shipmentRoutes from './routes/shipmentRoutes.js';
import courierRoutes from './routes/courierRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import syncLogRoutes from './routes/syncLogRoutes.js';

// Initialize express app
const app: Application = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tracking', trackingRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/couriers', courierRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/sync-logs', syncLogRoutes);

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'ParcelTrack API is running',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use((err: Error, _req: Request, res: Response) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});

export default app;
