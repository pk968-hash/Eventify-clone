import bcrypt from "bcryptjs";
import { sendToken } from "../utils/sendToken.js";
import { sendErrorRes } from "../utils/sendErrorRes.js";
import Employer from "../models/employer.model.js";
import Jobseeker from "../models/jobseeker.model.js";
import { uploadImageToCloudinary } from "../utils/uploadDataToCloudinary.js";
import fs from "fs";
import Admin from "../models/admin.model.js";

export const checkAvailability = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email || email.length === 0) {
      return sendErrorRes(res, 400, false, "Email is required");
    }
    const userAvailableAsEmployer = await Employer.findOne({ email });
    if (userAvailableAsEmployer) {
      return res.status(400).json({
        success: false,
        userAvailable: true,
        isEmployer: true,
        message: "Please sign in as Employer",
      });
    }
    const userAvailableAsJobseeker = await Jobseeker.findOne({ email });
    if (userAvailableAsJobseeker) {
      return res
        .status(200)
        .json({ success: true, userAvailable: true, isEmployer: false });
    }
    res
      .status(200)
      .json({ success: true, userAvailable: false, isEmployer: false });
  } catch (error) {
    console.error("Error in check-availability controller", error);
    return sendErrorRes(
      res,
      500,
      false,
      error.message || "Internal Server Error"
    );
  }
};

export const PersonalIdVerify = async (req, res) => {
  const { nationalId } = req.body;
  if (!nationalId) {
    return sendErrorRes(res, 400, false, "Personal Id is required");
  }
  try {
    const existingPersonalId = await Jobseeker.findOne({ nationalId });
    if (existingPersonalId) {
      return sendErrorRes(res, 400, false, "Personal Id is already in use");
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in PersonalIdVerify controller", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

export const EmployerAvailable = async (req, res) => {
  const { email, phone } = req.body;
  if (!email || email.length === 0 || !phone || phone.length === 0) {
    return sendErrorRes(res, 400, false, "All fields are required");
  }
  try {
    const existingEmailAsEmployer = await Employer.findOne({ email });
    const existingEmailAsJobseeker = await Jobseeker.findOne({ email });
    if (existingEmailAsEmployer || existingEmailAsJobseeker) {
      return sendErrorRes(res, 400, false, "Email is already used");
    }
    const existingPhone = await Employer.findOne({ phone });
    if (existingPhone) {
      return sendErrorRes(res, 400, false, "Phone is already used");
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in EmployerAvailable controller", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

export const JobSeekerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || email.length === 0 || !password || password.length === 0) {
      return sendErrorRes(res, 400, false, "Email and password is required");
    }
    const userAvailable = await Jobseeker.findOne({ email });
    if (!userAvailable) {
      return sendErrorRes(res, 401, false, "Invalid email or password");
    }
    const isPasswordMatched = await bcrypt.compare(
      password,
      userAvailable.password
    );

    if (!isPasswordMatched) {
      return sendErrorRes(res, 401, false, "Incorrect password");
    }
    sendToken(userAvailable, 200, "Jobseeker login successfully", res, req); // send auth token
  } catch (error) {
    console.error("Error in JobSeekerLogin controller", error);
    return sendErrorRes(
      res,
      500,
      false,
      error.message || "Internal Server Error"
    );
  }
};

export const JobSeekerSignup = async (req, res) => {
  let {
    email,
    firstName,
    lastName,
    citizenship,
    nationalId,
    city,
    jobOffers,
    invitationCode,
    password,
    confirmPassword,
    senderBankDetails,
  } = req.body;

  senderBankDetails = JSON.parse(senderBankDetails);

  if (
    !firstName ||
    !lastName ||
    !citizenship ||
    !nationalId ||
    !city ||
    !password ||
    !confirmPassword ||
    !senderBankDetails ||
    !senderBankDetails.bankName ||
    !senderBankDetails.accountTitle ||
    !senderBankDetails.accountNumber
  ) {
    return sendErrorRes(res, 400, false, "All fields are required");
  }

  if (!req.files) {
    return sendErrorRes(res, 400, false, "Please upload deposit image");
  }

  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailregex.test(email)) {
    return sendErrorRes(res, 400, false, "Invalid email");
  }

  if (password.length < 6) {
    return sendErrorRes(
      res,
      400,
      false,
      "Password must be at least 6 characters long"
    );
  }

  if (password !== confirmPassword) {
    return sendErrorRes(res, 400, false, "Passwords do not match");
  }

  try {
    const existingEmailAsEmployer = await Employer.findOne({ email });
    const existingEmailAsJobseeker = await Jobseeker.findOne({ email });
    if (existingEmailAsEmployer || existingEmailAsJobseeker) {
      return sendErrorRes(res, 400, false, "Email is already used");
    }

    const existingNationalId = await Jobseeker.findOne({ nationalId });
    if (existingNationalId) {
      return sendErrorRes(res, 400, false, "National ID already in use");
    }

    // random bgColor

    const colors = [
      "bg-red-400",
      "bg-blue-400",
      "bg-yellow-400",
      "bg-green-400",
    ];

    const randomeNumber = Math.floor(Math.random() * colors.length);

    const bgColor = colors[randomeNumber];

    const imagePath = req.files.bankDepositImage[0].path;
    const imageUrl = await uploadImageToCloudinary(imagePath);
    if (imageUrl) {
      fs.unlinkSync(imagePath);
    }

    const newUser = new Jobseeker({
      firstName,
      lastName,
      email,
      bgColor,
      password,
      role: "Jobseeker",
      citizenship,
      nationalId,
      city,
      jobOffers: jobOffers || false,
      invitationCode: invitationCode || null,
      senderBankDetails,
      bankDepositImage: imageUrl,
    });

    await newUser.save();

    sendToken(newUser, 200, "Jobseeker signup successfully", res, req); // send auth token
  } catch (error) {
    console.error("Error in JobSeekerSignin controller", error);
    return sendErrorRes(
      res,
      500,
      false,
      error.message || "Internal Server Error"
    );
  }
};

export const EmployerLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || email.length === 0 || !password || password.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Email and Password is required" });
    }
    const employee = await Employer.findOne({ email });
    if (!employee) {
      return sendErrorRes(res, 404, false, "Employer not found");
    }
    const isPasswordMatched = await bcrypt.compare(password, employee.password);
    if (!isPasswordMatched) {
      return res.status(401).json({
        success: false,
        message: "Incorrect email or password. Please try again",
      });
    }

    sendToken(employee, 200, "Employer login successful", res, req);
  } catch (error) {
    console.error("Error in EmployerLogin controller", error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

export const EmployerSignup = async (req, res) => {
  const {
    name,
    email,
    phone,
    companyName,
    companyCode,
    VATCode,
    address,
    description,
    // logo
    password,
    confirmPassword,
  } = req.body;

  if (!req.files) {
    return sendErrorRes(res, 400, false, "Company image is required");
  }

  if (
    !name ||
    !companyName ||
    !companyCode ||
    !VATCode ||
    !address ||
    !description ||
    !email ||
    !phone ||
    !password
  ) {
    return sendErrorRes(res, 400, false, "All fields are required");
  }
  const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailregex.test(email)) {
    return sendErrorRes(res, 400, false, "Invalid email");
  }

  if (password.length < 6) {
    return sendErrorRes(
      res,
      400,
      false,
      "Password must be at least 6 characters long"
    );
  }

  if (password !== confirmPassword) {
    return sendErrorRes(res, 400, false, "Passwords do not match");
  }

  try {
    const existingEmailAsJobseeker = await Jobseeker.findOne({ email });
    const existingEmailAsEmployer = await Employer.findOne({ email });
    if (existingEmailAsEmployer || existingEmailAsJobseeker) {
      return sendErrorRes(res, 400, false, "Email is already used");
    }

    const existingCompanyCode = await Employer.findOne({ companyCode });
    if (existingCompanyCode) {
      return sendErrorRes(res, 400, false, "CompanyCode is already used");
    }

    const existingPhone = await Employer.findOne({ phone });
    if (existingPhone) {
      return sendErrorRes(res, 400, false, "Phone is already used");
    }

    const existingVAT = await Employer.findOne({ VATCode });
    if (existingVAT) {
      return sendErrorRes(res, 400, false, "VAT code is already used");
    }

    const imagePath = req.files.companyImage[0].path;
    const imageUrl = await uploadImageToCloudinary(imagePath);
    if (imageUrl) {
      fs.unlinkSync(imagePath);
    }

    const newEmployer = await Employer.create({
      name,
      email,
      phone,
      companyName,
      companyImage: imageUrl,
      companyCode,
      VATCode,
      address,
      description,
      password,
    });
    sendToken(newEmployer, 200, "Onboarding completed", res, req);
  } catch (error) {
    console.error("Error in EmployerSignup controller", error);
    return sendErrorRes(
      res,
      500,
      false,
      error.message || "Internal Server Error"
    );
  }
};

export const AdminSignup = async (req, res) => {
  let { name, username, password } = req.body;
  try {
    if (!name || !username || !password) {
      return sendErrorRes(res, 400, false, "All fields are required");
    }
    if (password.length < 6) {
      return sendErrorRes(
        res,
        400,
        false,
        "Password must be atleast 6 characters long"
      );
    }
    username = username.toLowerCase();
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return sendErrorRes(res, 400, false, "Username already used");
    }
    const admin = await Admin.create({
      name,
      username,
      password,
    });

    sendToken(admin, 201, "Admin created successfully", res, req);
  } catch (error) {
    console.error("Error in Admin-Signup controller:", error);
    return sendErrorRes(
      res,
      500,
      false,
      error.message || "Internal Server Error"
    );
  }
};

export const AdminLogin = async (req, res) => {
  let { username, password } = req.body;
  try {
    if (!username || !password) {
      return sendErrorRes(res, 400, false, "All fields are required");
    }
    username = username.toLowerCase();
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return sendErrorRes(res, 404, false, "Invalid credentials");
    }
    const isPasswordMatched = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatched) {
      return sendErrorRes(res, 404, false, "Invalid credentials");
    }
    sendToken(admin, 200, "Login successful", res, req);
  } catch (error) {
    console.error("Error in Admin-Login controller:", error);
    return sendErrorRes(
      res,
      500,
      false,
      error.message || "Internal Server Error"
    );
  }
};

export const getMe = async (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.error("Error in getMe controller", error);
    return sendErrorRes(
      res,
      500,
      false,
      error.message || "Internal Server Error"
    );
  }
};

export const Logout = async (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie("eventfyToken", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "None" : "Lax",
  });
  res.status(200).json({ success: true, message: "Logout successfully" });
};
