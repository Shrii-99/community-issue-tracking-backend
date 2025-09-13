import jwt from "jsonwebtoken";
import { AppError, catchAsync } from "../middlewares/error.middlware.js";
import { UserModel } from "../models/user.model.js";
import { generateToken } from "../util/generateToken.js";

export const registerUser = catchAsync(async (req, res) => {
  const { firstname, lastname, password, email, role } = req.body;
  const user = await UserModel.findOne({email});
  if (user) {
    throw new AppError(
      "User exist with the email!, Please enter the correct email",
      400
    );
  }
  const newUser = await UserModel.create({
    firstname: firstname,
    lastname: lastname,
    password: password,
    role: role,
    email: email,
  });

  if (!newUser) {
    throw new AppError("Something went wrong! please try again", 500);
  }

  return res
    .status(201)
    .json({ newUser, message: "User registered successfully! please log in" });
});

export const login = catchAsync(async (req, res) => {
  const { password, email } = req.body;
  const user = await UserModel.findOne({email}).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw new AppError(
      "User does not exist with the email!, Please register the correct user",
      400
    );
  }
 

  generateToken(res , user._id , `Welcome back ${user.firstname}`)
});
