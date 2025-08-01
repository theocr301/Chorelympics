import express, { Application } from 'express';
import cors from 'cors';
import choreRouter from './Router/choreRouter';
import userRouter from './Router/userRouter';

const app: Application = express();
const port: number = 3000;

app.use(cors());
app.use(express.json());
app.use(choreRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}!`);
});