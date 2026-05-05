import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

// 1. Load Environment Variables (from your .env file)
dotenv.config();

// 2. Initialize the Express Application
const app = express();
const PORT = process.env.PORT || 8080;





// ==========================================
// 3. GLOBAL MIDDLEWARE (The Bouncers)
// ==========================================

// Helmet hides metadata about your server to prevent targeted bot attacks
app.use(helmet());

// CORS tells the server to ONLY accept requests from your Vercel frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true, // Required if we are using HTTP-only cookies for JWTs
}));

// Tells Express to automatically parse incoming JSON data (like form submissions)
app.use(express.json());








// ==========================================
// 4. ROUTES (The Map)
// ==========================================

// A simple "Health Check" route. Render and Cloudflare use this 
// to check if your server is awake and healthy.
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ 
    status: 'success', 
    message: 'Academy LMS API is running smoothly.',
    timestamp: new Date().toISOString()
  });
});

// Later, you will import your real routes like this:
// import userRoutes from './routes/user.routes';
// app.use('/api/users', userRoutes);





// ==========================================
// 5. GLOBAL ERROR HANDLER (The Safety Net)
// ==========================================

// If any code crashes anywhere in your app, it falls down into this function
// instead of showing a scary HTML error to the student.
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('🔥 Server Error:', err.message);
  
  res.status(500).json({
    status: 'error',
    message: 'Internal Server Error. Our team has been notified.'
  });
});








// ==========================================
// 6. BOOT UP THE SERVER
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 API Server is alive on http://localhost:${PORT}`);
  console.log(`🛡️  Helmet Security: ENABLED`);
  console.log(`🌐 CORS allowed for: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});