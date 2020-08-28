const functions = require('firebase-functions');
const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const helmet = require('helmet');

const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const inventoryRouter = require('./routes/inventoryRoutes');
const clientRouter = require('./routes/clientRoutes');
const sellRouter = require('./routes/sellRoutes');

const app = express();

app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/inventory', inventoryRouter);
app.use('/clients', clientRouter);
app.use('/sell', sellRouter);

exports.api = functions.region('asia-northeast1').https.onRequest(app);
