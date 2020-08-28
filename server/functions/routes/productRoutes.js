const { Router } = require('express');

// controller
const {
  getAllProducts,
  addProduct,
  getProduct,
  updateProduct,
} = require('../controllers/productController');
// middleware
const { FBauth } = require('../util/fbAuth');

const router = Router();

router.route('/').get(getAllProducts).post(FBauth, addProduct);
router.route('/:productId').get(getProduct).patch(FBauth, updateProduct);

module.exports = router;
