const { Router } = require('express');

// controller
const { sellProduct } = require('../controllers/sellController.js');
// middleware
const { FBauth } = require('../util/fbAuth');

const router = Router();

router.use(FBauth);

router.route('/').patch(sellProduct);

module.exports = router;
