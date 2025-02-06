import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './lib/db.js';
import { PORT } from '../config.js';

import userRoute from './routes/user.route.js';
import promptRoute from './routes/prompt.route.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/user', userRoute);
app.use('/prompt', promptRoute);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});