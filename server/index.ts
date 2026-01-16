import { app } from "./app";
import dotenv from 'dotenv';
dotenv.config();
// Route Imports
import authRoutes from './routes/authRoutes';

// Register Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});