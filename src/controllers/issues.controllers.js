import { AppError, catchAsync } from "../middlewares/error.middlware.js";
import { IssuesModel } from "../models/issues.model.js";

export const ReportIssue = catchAsync(async (req, res) => {
  const { title, description, address, location, imageUrl } = req.body;
  if (
    [title, description, address,  imageUrl].some(
      (field) => !field.trim()
    )
  ) {
    throw new AppError("All fields are required", 400);
  }

  if(!location || !location.type || !Array.isArray(location.coordinates)){
    throw new AppError("Location with latitude and longitude is required",  400);
  }

  const createIssue = await IssuesModel.create({
    title: title,
    description: description,
    address: address,
    location: location,
    imageUrl: imageUrl,
    status: "Reported",
  });

  if (!createIssue) {
    throw new AppError("Something went wrong, Please try again", 500);
  }

  return res
    .status(201)
    .json({ message: "Issue reported successfully", createIssue });
});
