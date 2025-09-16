import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.model.js";
import { AppError, catchAsync } from "./error.middlware.js";

export const isAuthenticated = catchAsync(async (req, res, next) => {
  //check if token exist in cookies
  const token = req.cookies.token;

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
    next();
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

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      console.log("Role:", req.user.role);
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

