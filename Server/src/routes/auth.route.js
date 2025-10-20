import express, { Router } from "express";
import {
  AdminLogin,
  AdminSignup,
  checkAvailability,
  EmployerAvailable,
  EmployerLogin,
  EmployerSignup,
  getMe,
  JobSeekerLogin,
  JobSeekerSignup,
  Logout,
  PersonalIdVerify,
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

// JOBSEEKER
router.post("/check-availability", checkAvailability);
router.post("/jobseeker-login", JobSeekerLogin);
router.post(
  "/jobseeker-signup",
  upload.fields([{ name: "bankDepositImage", maxCount: 1 }]),
  JobSeekerSignup
);
router.post("/idVerify", PersonalIdVerify);

//EMPLOYER
router.post("/employer-login", EmployerLogin);
router.post("/employer-available", EmployerAvailable);
router.post(
  "/employer-signup",
  upload.fields([{ name: "companyImage", maxCount: 1 }]),
  EmployerSignup
);

//ADMIN
router.post("/admin-signup", AdminSignup);
router.post("/admin-login", AdminLogin);

// login & logout
router.get("/me", isAuthenticated, getMe);
router.post("/logout", isAuthenticated, Logout);

export default router;
