const express = require('express');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');
const rabbitMQ = require('./common/rabbitmq');
const chefRouter = require('./routes/chef.router');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/chef', chefRouter);

const startServer = async() => {
    try {
        await prisma.$connect();
        console.log('Đã kết nối với Order DB');
        await rabbitMQ.connect();
        console.log('Đã kết nối với RabbitMQ');
        app.listen(PORT, () => {
            console.log(`Dịch vụ Chef chạy trên cổng ${PORT}`);
        });
    } catch (error) {
        console.error('Không thể khởi động server:', error);
        process.exit(1);
    }
};

startServer();

process.on('SIGTERM', async() => {
    await prisma.$disconnect();
    await rabbitMQ.close();
    process.exit(0);
});