import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employer",
      required: true,
    },
    companyImage: {
      type: String,
    },
    companyName: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    location: {
      workplace: String,
      city: String,
    },
    time: {
      from: String, // "09:00"
      to: String, // "18:00"
    },
    daysOfWork: Number, // total days estimate
    hourlyRate: Number,
    jobDescription: String,
    workingDays: [
      {
        date: Date,
        startTime: String, // "09:00"
        endTime: String, // "18:00"
        break: {
          start: String,
          duration: Number, // in minutes
        },
      },
    ],
    status: {
      type: String,
      enum: ["Active", "Filled", "On Hold", "Closed"],
      default: "Active",
    },
    totalPositions: {
      type: Number,
      default: 1,
    },
    appliedCandidates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Jobseeker",
      },
    ],
    deadline: Date,
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);
export default Job;
