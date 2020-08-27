const { admin, db } = require('./admin');

exports.FBauth = async (req, res, next) => {
  let idToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    idToken = req.headers.authorization.split(' ')[1];
  } else {
    return res
      .status(403)
      .json({ errors: 'You are not logged in! Please log in to get access' });
  }

  try {
    const token = await admin.auth().verifyIdToken(idToken);
    req.user = token;
    const user = await db
      .collection('users')
      .where('userId', '==', req.user.uid)
      .limit(1)
      .get();
    req.user.userId = user.docs[0].data().userId;
    next();
  } catch (error) {
    return res.status(403).json({ errors: 'Invalid Token' });
  }
};
