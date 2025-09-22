import { Router } from "express";
import { isAuthenticated, restrictTo } from "../middlewares/auth.middleware.js";
import { changeIssueStatus, deleteIssue, getAllIssues, ReportIssue } from "../controllers/issues.controllers.js";


const issueRouter = Router();

issueRouter.route("/report").post(isAuthenticated, restrictTo("user"), ReportIssue)
issueRouter.route("/change-status/:id").patch(isAuthenticated , restrictTo("admin") , changeIssueStatus);
issueRouter.route("/delete/:id").delete(isAuthenticated , restrictTo("admin") , deleteIssue);
issueRouter.route("/").get(isAuthenticated ,getAllIssues);

export default issueRouter;
