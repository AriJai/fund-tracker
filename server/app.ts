import express, { Request, Response } from "express";

export const app = express();

// Used for testing: index.test.ts
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to FundTracker!");
});