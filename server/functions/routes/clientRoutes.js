const { Router } = require('express');

// controller
const {
  addClient,
  updateClient,
  getAllClient,
  getClient,
} = require('../controllers/clientController');
// middleware
const { FBauth } = require('../util/fbAuth');

const router = Router();

router.use(FBauth);

router.route('/').get(getAllClient).post(addClient);
router.route('/:clientId').get(getClient).patch(updateClient);

module.exports = router;
