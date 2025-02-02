import express, { Application } from 'express';
import cors from 'cors';
import router from './app/routes';
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';

const app: Application = express();

// parser
app.use(express.json());
app.use(cookieParser());

app.use(cors({ origin: ['https://book-shop-client-mauve.vercel.app'], credentials: true }));
// app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

// application routes
app.use('/api/v1', router);

// check server health
app.get('/', (req, res) => {
  res.send('Server is running...');
});

// global error handler
app.use(globalErrorHandler);

// not found handler
app.use(notFound);

export default app;
