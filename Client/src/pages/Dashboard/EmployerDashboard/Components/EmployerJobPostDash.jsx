import React, { useState } from "react";
import { TextField } from "@mui/material";
import { PostJob } from "../../../../lib/APIs/jobApis";
import { useNavigate } from "react-router";
import WorkingDaysForm from "./WorkingDaysForm";
import {
  DatePicker,
  TimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const EmployerJobPostDash = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    workplace: "",
    timeFrom: "",
    timeTo: "",
    daysOfWork: "",
    hourlyRate: "",
    jobDescription: "",
    totalPositions: "",
    deadline: null,
    workingDays: [],
  });

  const [touched, setTouched] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Validation
  const errors = {
    jobTitle: touched.jobTitle && !formData.jobTitle,
    timeFrom: touched.timeFrom && !formData.timeFrom,
    timeTo: touched.timeTo && !formData.timeTo,
    hourlyRate: touched.hourlyRate && !formData.hourlyRate,
    jobDescription: touched.jobDescription && !formData.jobDescription,
    totalPositions: touched.totalPositions && !formData.totalPositions,
    deadline: touched.deadline && !formData.deadline,
    workplace: touched.workplace && !formData.workplace,
  };

  const isError = Object.values(errors).some(Boolean);

  const inputStyles = {
    width: "100%",
    "& .MuiInputBase-input": {
      fontWeight: 600,
      color: "#374151",
    },
    "& .MuiInputLabel-root": {
      fontWeight: 500,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": { borderColor: "#D1D5DB" },
      "&:hover fieldset": { borderColor: "#2563EB" },
      "&.Mui-focused fieldset": { borderColor: "#1E3A8A" },
      "&.Mui-error fieldset": { borderColor: "#DC2626" },
    },
    marginTop: "1.2rem",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!isError) {
      try {
        const response = await PostJob(formData);
        setSuccessMessage(response?.message || "Job Posted Successfully");
        setTimeout(() => {
          navigate("/employer/jobs-posted");
        }, 400);
      } catch (error) {
        setErrorMessage(error.response?.data?.message);
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#EAEEF3] flex flex-col items-center py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl flex flex-col items-center"
      >
        <h1 className="text-[#013573] font-semibold text-2xl mb-2">
          Post a New Job
        </h1>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            {/* Job Title */}
            <TextField
              label="Job Title"
              value={formData.jobTitle}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))
              }
              onBlur={() => setTouched((p) => ({ ...p, jobTitle: true }))}
              error={errors.jobTitle}
              helperText={errors.jobTitle ? "This field is required" : ""}
              sx={inputStyles}
              required
            />

            {/* Workplace */}
            <TextField
              label="Workplace"
              value={formData.workplace}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, workplace: e.target.value }))
              }
              onBlur={() => setTouched((p) => ({ ...p, workplace: true }))}
              error={errors.workplace}
              helperText={errors.workplace ? "This field is required" : ""}
              sx={inputStyles}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            {/* Time From */}
            <TimePicker
              label="Start Time"
              value={formData.timeFrom || null}
              onChange={(newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  timeFrom: newValue,
                }));
                setTouched((p) => ({ ...p, timeFrom: true }));
              }}
              ampm={false}
              slotProps={{
                textField: {
                  error: errors.timeFrom,
                  required: true,
                  sx: inputStyles,
                },
              }}
            />

            {/* Time To */}
            <TimePicker
              label="End Time"
              value={formData.timeTo || null}
              onChange={(newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  timeTo: newValue,
                }));
                setTouched((p) => ({ ...p, timeTo: true }));
              }}
              ampm={false}
              slotProps={{
                textField: {
                  error: errors.timeTo,
                  required: true,
                  sx: inputStyles,
                },
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            {/* Days of Work */}
            <TextField
              label="Days of Work"
              type="number"
              value={formData.daysOfWork}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, daysOfWork: e.target.value }))
              }
              sx={inputStyles}
            />

            {/* Hourly Rate */}
            <TextField
              label="Hourly Rate"
              type="number"
              value={formData.hourlyRate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, hourlyRate: e.target.value }))
              }
              onBlur={() => setTouched((p) => ({ ...p, hourlyRate: true }))}
              error={errors.hourlyRate}
              helperText={errors.hourlyRate ? "This field is required" : ""}
              sx={inputStyles}
              required
            />
          </div>

          {/* Job Description */}
          <TextField
            label="Job Description"
            multiline
            rows={4}
            value={formData.jobDescription}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                jobDescription: e.target.value,
              }))
            }
            onBlur={() => setTouched((p) => ({ ...p, jobDescription: true }))}
            error={errors.jobDescription}
            helperText={errors.jobDescription ? "This field is required" : ""}
            sx={inputStyles}
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
            {/* Total Positions */}
            <TextField
              label="Total Positions"
              type="number"
              value={formData.totalPositions}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  totalPositions: e.target.value,
                }))
              }
              onBlur={() => setTouched((p) => ({ ...p, totalPositions: true }))}
              error={errors.totalPositions}
              helperText={errors.totalPositions ? "This field is required" : ""}
              sx={inputStyles}
              required
            />

            {/* Deadline */}
            <DatePicker
              label="Deadline"
              value={formData.deadline || null}
              onChange={(newValue) => {
                setFormData((prev) => ({ ...prev, deadline: newValue }));
                setTouched((p) => ({ ...p, deadline: true }));
              }}
              slotProps={{
                textField: {
                  error: errors.deadline,
                  required: true,
                  sx: inputStyles,
                },
              }}
            />
          </div>
        </LocalizationProvider>

        <div className="w-full">
          <WorkingDaysForm
            formData={formData}
            setFormData={setFormData}
            inputStyles={inputStyles}
          />
        </div>

        {successMessage && (
          <div className="text-center bg-green-100 text-green-600 p-2 rounded-md w-full my-4 text-sm">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="text-center bg-red-100 text-red-600 p-2 rounded-md w-full my-4 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className={`w-full text-center py-2 rounded-md font-semibold mt-6 ${
            isError
              ? "bg-[#E0E0E0] text-[#A6A6A6] cursor-not-allowed"
              : "text-white bg-primary bg-primary-hover cursor-pointer transition-all duration-150"
          }`}
          disabled={isError}
        >
          Post Job
        </button>
      </form>
    </div>
  );
};

export default EmployerJobPostDash;
