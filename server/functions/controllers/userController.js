const firebase = require('firebase');
const { signUp, login } = require('../validations/userValidation');

firebase.initializeApp(require('../util/fbConfig'));

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

exports.signUp = async (req, res) => {
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
};

exports.logIn = async (req, res) => {
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
};
