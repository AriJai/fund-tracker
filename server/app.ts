import express, { Application, Request, Response } from "express";
import client from './db';

export const app: Application = express();

// Used for parsing JSON
app.use(express.json());

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