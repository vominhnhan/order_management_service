import jwt from "jsonwebtoken";
import prisma from "../common/prisma/init.prisma.js";

export const protect = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    const user = await prisma.users.findUnique({
      where: {
        id: decoded.user_id,
      },
      include: {
        roles: true,
      },
    });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
