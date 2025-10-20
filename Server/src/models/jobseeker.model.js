import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const jobseekerSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    bgColor: {
      type: String,
    },
    role: {
      type: String,
      default: "Jobseeker",
    },
    citizenship: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    nationalId: {
      type: String,
      required: true,
      unique: true,
    },
    jobOffers: {
      type: Boolean,
      enum: [false, true],
      default: false,
    },
    invitationCode: {
      type: String,
    },
    bankDepositImage: {
      type: String,
      required: true,
    },
    senderBankDetails: {
      bankName: { type: String, required: true },
      accountTitle: { type: String, required: true },
      accountNumber: { type: String, required: true },
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
  },
  { timestamps: true }
);

// auto hash password
jobseekerSchema.pre("save", async function (next) {
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
jobseekerSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "7d",
    }
  );
};

const Jobseeker = mongoose.model("Jobseeker", jobseekerSchema);
export default Jobseeker;
