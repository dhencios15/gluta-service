const { Router } = require('express');

// controller
const {
  getAllProducts,
  addProduct,
} = require('../controllers/productcontroller');
// middleware
const { FBauth } = require('../util/fbAuth');

const router = Router();

router.route('/').get(getAllProducts).post(FBauth, addProduct);

module.exports = router;
