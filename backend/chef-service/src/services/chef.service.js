const { PrismaClient } = require('@prisma/client');
const rabbitMQ = require('../common/rabbitmq');

const prisma = new PrismaClient();

const getPendingOrderItems = async() => {
    return await prisma.order_items.findMany({
        where: { status: 'PREPARING' },
        include: { order: { include: { table: true } }, product: true },
    });
};

const updateOrderItemStatus = async(orderItemId, status) => {
    const updatedOrderItem = await prisma.order_items.update({
        where: { id: orderItemId },
        data: { status },
        include: { order: true, product: true },
    });

    await rabbitMQ.publishMessage('order_item_status', {
        orderItemId,
        status,
        orderId: updatedOrderItem.order.id,
    });

    return updatedOrderItem;
};

module.exports = { getPendingOrderItems, updateOrderItemStatus };