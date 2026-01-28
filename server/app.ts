import express, { Application, Request, Response } from "express";
import client from './db';
import cors from 'cors';
export const app: Application = express();
import cookieParser from 'cookie-parser';
// Route Imports
import authRoutes from './routes/authRoutes';

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);
app.use(express.json());

// Register Routes
app.use('/api/auth', authRoutes);

// Used for testing: index.test.ts
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to FundTracker!");
});

// Used for testing connection to database
app.get("/test-db", async (req: Request, res: Response) => {
  try {
    const result = await client.query("SELECT NOW()");
    res.send(`Database connection successful! Current time: ${result.rows[0].now}`);
  } catch (error) {
    console.error(`Database connection error: ${error}`);
    res.status(500).send('Database connection failed');
  }
});