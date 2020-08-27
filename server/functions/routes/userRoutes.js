const { Router } = require('express');
const { signUp, logIn } = require('../controllers/userController');

const router = Router();

router.post('/signup', signUp);
router.post('/login', logIn);

module.exports = router;
