const { Router } = require('express');
const {
  signUp,
  logIn,
  uploadImage,
  addUserDetails,
  getAuthUser,
} = require('../controllers/userController');
const { FBauth } = require('../util/fbAuth');

const router = Router();

router.post('/signup', signUp);
router.post('/login', logIn);

router.use(FBauth); // Check authenticate user routes below

router.route('/').get(getAuthUser).post(addUserDetails);
router.post('/upload', uploadImage);

module.exports = router;
