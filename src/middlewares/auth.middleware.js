import jwt from "jsonwebtoken";
import { AppError, catchAsync } from "./validation.middleware.js";
import { UserModel } from "../models/user.model.js";

export const isAuthenticated = catchAsync(async (req, res, next) => {
  //check if token exist in cookies
  const token = req.cookie.token;

  if (!token) {
    throw new AppError(
      "You are not logged in. please log in to get access",
      401
    );
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.id = decodedToken.userId;
    const user = await UserModel.findById(req.id);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    req.user = user;
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      throw new AppError("Your token has expired. Please log in again", 401);
    }

    if (error.name === "TokenExpiredError") {
      throw new AppError("Your token has expired. Please log in again.", 401);
    }

    throw error;
  }
});
