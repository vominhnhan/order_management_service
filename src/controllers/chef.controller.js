const chefService = require('../services/chef.service');

const getPendingOrderItems = async(req, res) => {
    try {
        const orderItems = await chefService.getPendingOrderItems();
        res.status(200).json(orderItems);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy danh sách món ăn đang chuẩn bị', error });
    }
};

const updateOrderItemStatus = async(req, res) => {
    const { orderItemId, status } = req.body;

    if (!orderItemId || !status) {
        return res.status(400).json({ message: 'Yêu cầu orderItemId và status' });
    }

    if (!['PREPARING', 'COMPLETED'].includes(status)) {
        return res.status(400).json({ message: 'Trạng thái không hợp lệ' });
    }

    try {
        const updatedOrderItem = await chefService.updateOrderItemStatus(orderItemId, status);
        res.status(200).json(updatedOrderItem);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái món ăn', error });
    }
};

module.exports = { getPendingOrderItems, updateOrderItemStatus };