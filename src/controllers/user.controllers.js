import jwt from "jsonwebtoken";
import { AppError, catchAsync } from "../middlewares/error.middlware.js";
import { UserModel } from "../models/user.model.js";

export const registerUser = catchAsync(async (req, res) => {
  const { firstname, lastname, password, email, role } = req.body;
  const user = await UserModel.findOne(email);
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
  const user = await UserModel.findOne(email);
  if (!user) {
    throw new AppError(
      "User does not exist with the email!, Please register the correct user",
      400
    );
  }
  const isCorrectPassword = await user.comparePassword(password);

  if (!isCorrectPassword) {
    throw new AppError("Password is wrong! Please try again", 401);
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    "prathmesh_patil",
    { expiresIn: "1d" }
  );

  return res
    .status(200)
    .json({ token, message: "User registered successfully! please log in" });
});
