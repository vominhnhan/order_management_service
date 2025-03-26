const chefService = require('../services/chef.service');
const { responseSuccess, responseError } = require('../common/helpers/response.helper');

const getPendingOrderItems = async(req, res) => {
    try {
        const orderItems = await chefService.getPendingOrderItems();
        const resData = responseSuccess(orderItems, 'Lấy danh sách món ăn đang chuẩn bị thành công', 200);
        res.status(resData.code).json(resData);
    } catch (error) {
        const resData = responseError('Lỗi khi lấy danh sách món ăn đang chuẩn bị', 500);
        res.status(resData.code).json(resData);
    }
};

const updateOrderItemStatus = async(req, res) => {
    const { orderItemId, status } = req.body;
    if (!orderItemId || !status) {
        const resData = responseError('Yêu cầu orderItemId và status', 400);
        return res.status(resData.code).json(resData);
    }
    if (!['PREPARING', 'COMPLETED'].includes(status)) {
        const resData = responseError('Trạng thái không hợp lệ', 400);
        return res.status(resData.code).json(resData);
    }
    try {
        const updatedOrderItem = await chefService.updateOrderItemStatus(orderItemId, status);
        const resData = responseSuccess(updatedOrderItem, 'Cập nhật trạng thái món ăn thành công', 200);
        res.status(resData.code).json(resData);
    } catch (error) {
        const resData = responseError('Lỗi khi cập nhật trạng thái món ăn', 500);
        res.status(resData.code).json(resData);
    }
};

module.exports = { getPendingOrderItems, updateOrderItemStatus };