const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

const userRouter = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(mongoSanitize());

app.use('/api/v1/users', userRouter);

app.use('/api', (req, res) => {
  res.send('Hello world');
});

module.exports = app;
