import { Router } from "express";
import { getCurrentUserProfile, login, registerUser } from "../controllers/user.controllers.js";
import  {isAuthenticated} from "../middlewares/auth.middleware.js"
const userRouter = Router();

userRouter.route("/signup").post(registerUser);
userRouter.route("/login").post(login);
userRouter.route("/profile").get(isAuthenticated , getCurrentUserProfile)

export default userRouter;
