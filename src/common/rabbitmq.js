const amqp = require('amqplib');
const dotenv = require('dotenv');

dotenv.config();

let connection = null;
let channel = null;

const connect = async() => {
    try {
        connection = await amqp.connect(process.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        await channel.assertQueue('order_item_status', { durable: true });
        console.log('Đã kết nối với RabbitMQ');
    } catch (error) {
        console.error('Kết nối RabbitMQ thất bại:', error);
        throw error;
    }
};

const publishMessage = async(queue, message) => {
    if (!channel) throw new Error('Kênh RabbitMQ chưa được khởi tạo');
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
};

const close = async() => {
    if (channel) await channel.close();
    if (connection) await connection.close();
};

module.exports = { connect, publishMessage, close };