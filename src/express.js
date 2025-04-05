import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import userRoutes from '/src/routes/user.router.js';
import authRoutes from '/src/routes/auth.router.js';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(cors());

app.use('/', userRoutes);
app.use('/', authRoutes);

export default app;
