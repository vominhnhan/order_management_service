const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const chefController = require('../controllers/chef.controller');

const router = express.Router();

router.use(protect);

router.get('/pending-order-items', chefController.getPendingOrderItems);
router.put('/update-order-item', chefController.updateOrderItemStatus);

module.exports = router;