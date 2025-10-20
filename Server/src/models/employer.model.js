import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Job from "./job.model.js";

const employerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    companyImage: {
      type: String,
      default: "",
    },
    companyCode: {
      type: String,
    },
    VATCode: { type: String },
    address: { type: String },
    description: { type: String },
    role: {
      type: String,
      default: "Employer",
    },
    approved: {
      type: Boolean,
      default: false,
      enum: [true, false],
    },
    blocked: {
      type: Boolean,
      default: false,
      enum: [true, false],
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

// auto hash password
employerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// generate token
employerSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
};

// delete jobs when employer deleted
employerSchema.pre("findOneAndDelete", async function (next) {
  const employer = await this.model.findOne(this.getFilter());
  if (employer) {
    await Job.deleteMany({ postedBy: employer._id });
  }
  next();
});

employerSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    await Job.deleteMany({ postedBy: this._id });
    next();
  }
);

const Employer = mongoose.model("Employer", employerSchema);

export default Employer;
