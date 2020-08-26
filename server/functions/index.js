const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
const firebase = require('firebase');
const middleware = require('./middleware/joi.middleware');
const schemas = require('./helper/validations');

const firebaseConfig = {
  apiKey: 'AIzaSyDBGa0hwAVGrUCwIfF3CmUunwQEPZ1hEkY',
  authDomain: 'dhencio-marioplan.firebaseapp.com',
  databaseURL: 'https://dhencio-marioplan.firebaseio.com',
  projectId: 'dhencio-marioplan',
  storageBucket: 'dhencio-marioplan.appspot.com',
  messagingSenderId: '1095095980140',
  appId: '1:1095095980140:web:617aabde647805bff30849',
  measurementId: 'G-BXE17N6Y3Q',
};

admin.initializeApp({
  credential: admin.credential.cert(require('./key/admin.json')),
  // databaseURL: 'https://dhencio-marioplan.firebaseio.com',
});
firebase.initializeApp(firebaseConfig);

app.get('/products', (req, res) => {
  admin
    .firestore()
    .collection('products')
    .get()
    .then((data) => {
      let products = [];
      data.forEach((doc) => {
        products.push({
          productId: doc.id,
          ...doc.data(),
        });
      });
      return res.json(products);
    })
    .catch((err) => console.log(err));
});

app.post('/products', (req, res) => {
  const { title, description, price, quantity } = req.body;
  const newProduct = {
    title,
    description,
    price,
    quantity,
  };

  admin
    .firestore()
    .collection('products')
    .doc(title)
    .set(newProduct)
    .then((doc) => {
      res.json({
        message: 'Product created',
      });
    })
    .catch((err) => {
      res.statu(500).json({ error: 'Something went wrong' });
    });
});

// Signup , Signin

app.post('/signup', middleware(schemas.signUp), (req, res) => {
  const { email, password, confirmPassword } = req.body;

  const newUser = {
    email,
    password,
    confirmPassword,
  };

  firebase
    .auth()
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then((data) => {
      return res
        .status(201)
        .json({ message: `User ${data.user.uid} signup successfully` });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
});

exports.api = functions.region('asia-northeast1').https.onRequest(app);
