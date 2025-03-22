const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const authMiddleware = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Không có token hoặc không đúng định dạng' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const response = await axios.post(`${process.env.AUTH_SERVICE_URL}/api/auth/verify`, { token });
        const { role } = response.data;

        if (role !== 'CHEF') {
            return res.status(403).json({ message: 'Truy cập bị từ chối: Yêu cầu vai trò Đầu bếp' });
        }

        req.user = response.data;
        next();
    } catch (error) {
        if (error.response) {
            return res.status(401).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
        } else {
            return res.status(500).json({ message: 'Lỗi kết nối đến dịch vụ xác thực' });
        }
    }
};

module.exports = authMiddleware;