import Employer from "../models/employer.model.js";
import Job from "../models/job.model.js";
import { sendErrorRes } from "../utils/sendErrorRes.js";

export const JobPost = async (req, res) => {
  const {
    jobTitle,
    timeFrom,
    timeTo,
    daysOfWork,
    hourlyRate,
    jobDescription,
    totalPositions,
    deadline,
    workplace,
    workingDays,
  } = req.body;

  // Validation
  if (!jobTitle || !hourlyRate || !jobDescription || !workplace) {
    return sendErrorRes(res, 400, false, "All fields are required");
  }

  if (hourlyRate <= 0) {
    return sendErrorRes(res, 400, false, "Hourly rate must be greater than 0");
  }

  try {
    const employer = await Employer.findById(req.user._id);
    if (!employer) {
      return sendErrorRes(res, 404, false, "Employer not found");
    }

    const newJob = await Job.create({
      postedBy: req.user._id,
      companyImage: employer.companyImage,
      companyName: employer.companyName,
      jobTitle,
      location: {
        city: employer.city,
        workplace: workplace,
      },
      time: {
        from: timeFrom,
        to: timeTo,
      },
      daysOfWork,
      hourlyRate,
      jobDescription,
      totalPositions: totalPositions || 1,
      deadline,
      workingDays,
    });
    return res
      .status(201)
      .json({ success: true, message: "Job posted successfully", newJob });
  } catch (error) {
    console.error("Error in JobPost controller:", error);
    return sendErrorRes(
      res,
      500,
      false,
      error.message || "Internal Server Error"
    );
  }
};

export const GetAll = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    return res.status(200).json(jobs);
  } catch (error) {
    console.error("Error in GetAll Jobs:", error);
    return sendErrorRes(
      res,
      500,
      false,
      error.message || "Internal Server Error"
    );
  }
};

export const MyPostedJobs = async (req, res) => {
  try {
    const userId = req.user._id;
    const employer = await Employer.findById(userId);
    if (!employer) {
      return sendErrorRes(res, 404, false, "Employer not found");
    }
    const postedJobs = await Job.find({ postedBy: userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json(postedJobs);
  } catch (error) {
    console.error("Error in MyPostedJobs Jobs:", error);
    return sendErrorRes(
      res,
      500,
      false,
      error.message || "Internal Server Error"
    );
  }
};
