import { Router } from "express";
import { isAuthenticated, restrictTo } from "../middlewares/auth.middleware.js";
import { ReportIssue } from "../controllers/issues.controllers.js";


const issueRouter = Router();

issueRouter.route("/report").post(isAuthenticated, restrictTo("user"), ReportIssue)

export default issueRouter;
