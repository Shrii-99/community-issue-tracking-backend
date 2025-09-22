import { AppError, catchAsync } from "../middlewares/error.middlware.js";
import { IssuesModel } from "../models/issues.model.js";

export const ReportIssue = catchAsync(async (req, res) => {
  const { title, description, address, location, imageUrl } = req.body;
  console.log(req.body)
  if ([title, description, address, imageUrl].some((field) => !field.trim())) {
    throw new AppError("All fields are required", 400);
  }

  if (!location || !location.type || !Array.isArray(location.coordinates)) {
    throw new AppError("Location with latitude and longitude is required", 400);
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
    throw new AppError("Something went wrong, Please try again from backend", 500);
  }

  return res
    .status(201)
    .json({ message: "Issue reported successfully", createIssue });
});

export const changeIssueStatus = catchAsync(async (req, res) => {
  const role = req.user.role;
  console.log(role, "Here");

  if (role !== "admin") {
    throw new AppError("You dont have permission to perform this action", 403);
  }
  const issueId = req.params.id;
  if (!issueId) {
    throw new AppError("Issue ID is required", 400);
  } 
  const  {status}  = req.body; // expect new status in body
  const isssue = await IssuesModel.findByIdAndUpdate(
    issueId,
    { status: status },
    { new: true, runValidators: true }
  );

  if (!isssue) {
    throw new AppError("Issue not found with this ID", 404);
  }

  res.status(200).json({
    status: "success",
    message: "Issue Status updated successfully",
    data: isssue,
  });
});

export const getAllIssues = catchAsync(async (req, res) => {
  const issues = await IssuesModel.find();

  if (issues.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "No issues found",
    });
  }

  res.status(200).json({
    status: "success",
    results: issues.length,
    issues
  });
});

export const deleteIssue = catchAsync(async (req, res) => {
  const role = req.user.role;
  const userId = req.id; // current logged-in user
  const issueId = req.params.id;
  if (!issueId) {
    throw new AppError("Issue ID is required", 400);
  }

  // Find the issue first
  const issue = await IssuesModel.findById(issueId);

  if (!issue) {
    throw new AppError("Issue not found", 404);
  }

  // Only admin or the issue owner can delete
  if (role !== "admin" && issue.createdBy.toString() !== userId.toString()) {
    throw new AppError("You don't have permission to delete this issue", 403);
  }

  await IssuesModel.findByIdAndDelete(issueId);

  res.status(200).json({
    status: "success",
    message: "Issue deleted successfully",
  });
});
