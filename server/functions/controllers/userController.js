const firebase = require('firebase');

const { admin, db } = require('../util/admin');
const {
  signUp,
  login,
  addMoreDetails,
} = require('../validations/userValidation');
const config = require('../util/fbConfig');

firebase.initializeApp(config);

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

exports.getAuthUser = async (req, res) => {
  try {
    let userData = {};
    const user = await db.doc(`/users/${req.user.userId}`).get();
    if (user.exists) userData = user.data();
    return res.status(200).json(userData);
  } catch (error) {
    return res.status(400).json({ errors: 'No user login' });
  }
};

exports.signUp = async (req, res) => {
  //Validations
  const { errors, isValid } = signUp(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { email, password, role } = req.body;
  const noImage = 'no-image.jpg';
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
      imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImage}?alt=media`,
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

exports.addUserDetails = async (req, res) => {
  const { errors, isValid } = addMoreDetails(req.body);
  if (!isValid) return res.status(400).json(errors);
  const { name } = req.body;

  try {
    await db.doc(`/users/${req.user.userId}`).update({ name });
    return res.status(200).json({ message: 'update success' });
  } catch (error) {
    return res.status(500).json({ errors: error.code });
  }
};

exports.uploadImage = (req, res) => {
  const BusBoy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');

  let imageFileName;
  let imageToBeUploaded = {};

  const busboy = new BusBoy({
    headers: req.headers,
  });

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png')
      return res.status(400).json({ errors: 'Wrong file type submitted' });
    const imageExtension = filename.split('.')[filename.split('.').length - 1];
    imageFileName = `${Math.round(
      Math.random() * 10000000000
    )}.${imageExtension}`;
    const filePath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filePath, mimetype };
    file.pipe(fs.createWriteStream(filePath));
  });

  busboy.on('finish', async () => {
    try {
      await admin
        .storage()
        .bucket(`${config.storageBucket}`)
        .upload(imageToBeUploaded.filePath, {
          resumable: false,
          metadata: {
            metadata: {
              contentType: imageToBeUploaded.mimetype,
            },
          },
        });
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
      await db.doc(`/users/${req.user.userId}`).update({ imageUrl });
      return res.json({ message: 'Image uploaded Successfully' });
    } catch (error) {
      return res.status(500).json({ errors: error.code });
    }
  });
  busboy.end(req.rawBody);
};
