import express, { Router } from "express";
import {
  isAuthenticated,
  isAuthorized,
} from "../middleware/auth.middleware.js";
import {
  JobPost,
  GetAll,
  MyPostedJobs,
} from "../controllers/job.controller.js";
const router = express.Router();

router.post("/post", isAuthenticated, isAuthorized("Employer"), JobPost);
router.get("/getAll", isAuthenticated, GetAll);

router.get(
  "/my-posted-jobs",
  isAuthenticated,
  isAuthorized("Employer"),
  MyPostedJobs
);

export default router;
