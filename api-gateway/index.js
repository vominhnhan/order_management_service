const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

app.use(cors()); // Bật CORS để UI có thể gọi API

app.use('/api/auth', createProxyMiddleware({
    target: 'http://auth-service:3000',
    changeOrigin: true,
}));

app.use('/api/chef', createProxyMiddleware({
    target: 'http://chef-service:3001',
    changeOrigin: true,
}));

app.listen(3000, () => {
    console.log('API Gateway running on port 3000');
});