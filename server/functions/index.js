const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();
const firebase = require('firebase');

const { signUp, login } = require('./validations/userValidation');

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

const db = admin.firestore();

app.get('/products', (req, res) => {
  db.collection('products')
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

  db.collection('products')
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

app.post('/signup', async (req, res) => {
  //Validations
  const { errors, isValid } = signUp(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { email, password, role } = req.body;
  const createdAt = new Date();
  try {
    // SIGN UP USER
    const signUp = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    // GET TOKEN & OTHER USER INFO
    const token = signUp.user.getIdToken();
    const newUser = {
      userId: signUp.user.uid,
      email: signUp.user.email,
      role,
      createdAt,
    };
    // SUBMIT USER INFO & TOKEN
    createUser(newUser, token, res);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return res.status(500).json({ errors: 'Email already in use' });
    } else {
      return res.status(500).json({ errors: error.code });
    }
  }
});

app.post('/login', async (req, res) => {
  const { errors, isValid } = login(req.body);
  if (!isValid) return res.status(400).json(errors);
  const { email, password } = req.body;

  try {
    const loginUser = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    const token = await loginUser.user.getIdToken();
    return res.status(201).json({ token: token });
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      return res.status(500).json({ errors: 'Incorrect Email or Password' });
    } else {
      return res.status(500).json({ errors: error.code });
    }
  }
});

// CREATE USER TO STORE IN USERS COLLECTION
const createUser = async (userAuth, token, res) => {
  const userRef = await db.doc(`/users/${userAuth.userId}`);
  const userSnapshot = await userRef.get();
  if (!userSnapshot.exists) {
    try {
      userRef.set(userAuth);
      return res.status(201).json({ token: token.i });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ errors: error.code });
    }
  } else {
    return res.status(400).json({ error: 'User already exists' });
  }
};

exports.api = functions.region('asia-northeast1').https.onRequest(app);
