import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Sets up the PostgreSQL connection using environment variables
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Connect to the database
client.connect()
  .then(() => console.log('Connected to the PostgreSQL database!'))
  .catch((err) => console.error('Database connection error', err.stack));

export default client;
