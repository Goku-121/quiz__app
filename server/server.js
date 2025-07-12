import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database/conns.js';
import questionRoutes from './routes/questionRoutes.js';
import resultRoutes from './routes/resultRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/questions', questionRoutes);
app.use('/api/results', resultRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
