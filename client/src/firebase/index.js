import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DB_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,

  //   apiKey: 'AIzaSyBYweQxqTt_MBNtyKi_17BmwCgQAtj4Gok',
  //   authDomain: 'dtech-2bb98.firebaseapp.com',
  //   databaseURL: 'https://dtech-2bb98.firebaseio.com',
  //   projectId: 'dtech-2bb98',
  //   storageBucket: 'dtech-2bb98.appspot.com',
  //   messagingSenderId: '56210171608',
  //   appId: '1:56210171608:web:eba2f7acefe5f9b70f59ad',
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.db = app.firestore();
    this.auth = app.auth();
  }

  // * ------------------------------------------- USER AUTH  -------------------------------------------------------

  signIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = this.db.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData,
        });
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  };

  getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = this.auth.onAuthStateChanged((userAuth) => {
        unsubscribe();
        resolve(userAuth);
      }, reject);
    });
  };

  signOut = () => this.auth.signOut();

  // * ------------------------------------------- PRODUCTS  -------------------------------------------------------

  getProducts = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const query = this.db
          .collection('products')
          .orderBy(app.firestore.FieldPath.documentId());
        const snapshot = await query.get();
        const products = [];
        snapshot.forEach((doc) => products.push({ id: doc.id, ...doc.data() }));
        resolve(products);
      } catch (error) {
        reject(new Error(':( Failed to fetch products.'));
      }
    });
  };
}

const firebase = new Firebase();

export default firebase;
