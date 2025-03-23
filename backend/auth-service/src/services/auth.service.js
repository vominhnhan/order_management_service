import prisma from "../common/prisma/init.prisma.js";
import jwt from "jsonwebtoken";

const authService = {
  login: async (req) => {
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
    if (userExists.password !== password) {
      throw new Error("Mật khẩu không chính xác");
    }

    const token = authService.createTokens(userExists.id);

    return token;
  },

  createTokens: (user_id) => {
    if (!user_id) {
      throw new Error("User is not exits");
    }

    const accessToken = jwt.sign(
      { user_id: user_id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRED,
      }
    );

    return {
      accessToken,
    };
  },
};

export default authService;
