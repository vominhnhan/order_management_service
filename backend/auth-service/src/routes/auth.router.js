import express from "express";
import authController from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/login", authController.login);
authRouter.post("/verify-token", authController.verifyToken);

export default authRouter;