import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import mongodbConnect from './configs/mongodb.connect.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';

const app = express();
mongodbConnect();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_API,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App is Running http://localhost:${PORT}`);
});
