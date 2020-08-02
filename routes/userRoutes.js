const { Router } = require('express');
const { signup, signin } = require('../controllers/authController');

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;
