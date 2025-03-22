const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const chefController = require('../controllers/chef.controller');

const router = express.Router();

// Áp dụng middleware xác thực
router.use(authMiddleware);

// Lấy danh sách món ăn đang chuẩn bị
router.get('/pending-order-items', chefController.getPendingOrderItems);

// Cập nhật trạng thái món ăn
router.put('/update-order-item', chefController.updateOrderItemStatus);

module.exports = router;