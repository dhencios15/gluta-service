const { Router } = require('express');

const auth = require('../middleware/auth');
const {
  createProduct,
  allProducts,
  getProduct,
  updateProduct,
} = require('../controllers/productController');

const router = Router();

router.route('/').get(allProducts).post(auth, createProduct);
router.route('/:id').get(getProduct).patch(auth, updateProduct);

module.exports = router;
