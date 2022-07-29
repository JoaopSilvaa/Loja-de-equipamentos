import express from 'express';
import productRouter from './routes/product.routes';
import error from './middlewares/error.middleware';

const app = express();

app.use(express.json());

app.use(productRouter);

app.use(error);

export default app;
