const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(require('../key/admin.json')),
  // databaseURL: 'https://dhencio-marioplan.firebaseio.com',
});
const db = admin.firestore();

module.exports = { admin, db };
