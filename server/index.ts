const express = require('express');
const cors = require('cors');
const choreRouter = require('./Router/choreRouter.js');
const userRouter = require('./Router/userRouter.js');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(choreRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}!`);
});