import prisma from "../common/prisma/init.prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const authService = {
    login: async(req) => {
        const { username, password } = req.body;

        // Check user exists
        const userExists = await prisma.users.findFirst({
            where: {
                username: username,
            },
        });

        if (!userExists) {
            throw new Error("Tài khoản không tồn tại");
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, userExists.password);
        if (!isPasswordValid) {
            throw new Error("Mật khẩu không chính xác");
        }

        const token = authService.createTokens(userExists.id);

        return token;
    },

    createTokens: (user_id) => {
        if (!user_id) {
            throw new Error("User is not exits");
        }

        const accessToken = jwt.sign({ user_id: user_id },
            process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRED || "1h", // Mặc định 1 giờ nếu không có trong .env
            }
        );

        return {
            accessToken,
        };
    },

    // Hàm để đăng ký người dùng (tùy chọn, nếu cần)
    register: async(username, password, role_id) => {
        const hashedPassword = await bcrypt.hash(password, 10); // Mã hóa mật khẩu
        const newUser = await prisma.users.create({
            data: {
                username,
                password: hashedPassword,
                role_id,
            },
        });
        return newUser;
    },
};

export default authService;