import { Router } from "express";
import { login, registerUser } from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.route("/signup").post(registerUser);
userRouter.route("/login").post(login);

export default userRouter;
