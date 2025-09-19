import { Router } from "express";
import { isAuthenticated, restrictTo } from "../middlewares/auth.middleware.js";
import { ReportIssue } from "../controllers/issues.controllers.js";


const issueRouter = Router();

issueRouter.route("/report").post(isAuthenticated, restrictTo("user"), ReportIssue)
issueRouter.route("/change-status").patch(isAuthenticated , restrictTo("admin") , ReportIssue);

export default issueRouter;
