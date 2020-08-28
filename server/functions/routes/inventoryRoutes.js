const { Router } = require('express');

// controller
const {
  getAllInventory,
  getInventory,
  updateInventory,
} = require('../controllers/inventoryController');
// middleware
const { FBauth } = require('../util/fbAuth');

const router = Router();

router.use(FBauth);

router.route('/').get(getAllInventory);
router.route('/:inventId').get(getInventory).patch(updateInventory);

module.exports = router;
