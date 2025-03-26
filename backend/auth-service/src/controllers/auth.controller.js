import authService from "../services/auth.service.js";
import {
    responseSuccess,
    responseError,
} from "../common/helpers/response.helper.js";

const authController = {
    login: async(req, res) => {
        try {
            const token = await authService.login(req);
            const resData = responseSuccess(token, `Login successfully`, 200);
            res.status(resData.code).json(resData);
        } catch (error) {
            const resData = responseError(error.message, 401);
            res.status(resData.code).json(resData);
        }
    },

    verify: async(req, res) => {
        try {
            const user = req.user; // Được gán từ middleware protect
            const resData = responseSuccess({ userId: user.id, role: user.roles.name },
                "Token verified successfully",
                200
            );
            res.status(resData.code).json(resData);
        } catch (error) {
            const resData = responseError("Failed to verify token", 401);
            res.status(resData.code).json(resData);
        }
    },
};

export default authController;