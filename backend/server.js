import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './lib/db';
import { PORT } from '../config';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});