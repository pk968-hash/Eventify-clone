import React, { useState } from "react";
import { TextField } from "@mui/material";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineRefresh } from "react-icons/md";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router";
import { JobseekerSignup } from "../../../lib/api";

const CandidateOnboardingPassword = ({
  formData,
  setFormData,
  handleRestartOnboard,
}) => {
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const { setAuthUser } = useAuth();

  const navigate = useNavigate();

  const passwordError = passwordTouched && !formData.password;
  const confirmPasswordError =
    confirmPasswordTouched &&
    (!formData.confirmPassword ||
      formData.confirmPassword !== formData.password);

  const isError = passwordError || confirmPasswordError;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordErrorMessage("");
    if (
      !isError &&
      formData.password &&
      formData.confirmPassword === formData.password
    ) {
      try {
        const response = await JobseekerSignup(formData);
        setAuthUser(response?.user);
        navigate("/candidate/profile");
      } catch (error) {
        setPasswordErrorMessage(error.response?.data?.message);
        console.log(error.response?.data);
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center relative">
      {/* Header */}
      <div className="w-full border-b-4 border-gray-300 h-24 flex items-center px-6 justify-end gap-2 absolute top-0">
        <div className="flex items-center">
          <BsGlobeCentralSouthAsia className="text-gray-600" size={15} />
          <p className="text-primary text-sm font-semibold pl-1">EN</p>
          <IoMdArrowDropdown className="text-primary" size={20} />
        </div>
        <div className="flex items-center gap-1 text-primary">
          <MdOutlineRefresh size={22} />
          <button
            onClick={() => handleRestartOnboard()}
            className="underline cursor-pointer"
          >
            Restart onboarding
          </button>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center"
      >
        <h1 className="text-[#013573] font-semibold text-2xl">
          Create your password
        </h1>

        {/* Password */}
        <TextField
          label="Password *"
          type="password"
          value={formData.password || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          onBlur={() => setPasswordTouched(true)}
          error={passwordError}
          helperText={passwordError ? "This field is required" : ""}
          sx={{
            width: "300px",
            marginTop: "2rem",
            "& .MuiInputBase-input": {
              fontWeight: 600,
              color: "#374151",
            },
            "& .MuiInputLabel-root": { fontWeight: 500 },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#D1D5DB" },
              "&:hover fieldset": { borderColor: "#2563EB" },
              "&.Mui-focused fieldset": { borderColor: "#1E3A8A" },
              "&.Mui-error fieldset": { borderColor: "#DC2626" },
            },
          }}
        />

        {/* Confirm Password */}
        <TextField
          label="Confirm Password *"
          type="password"
          value={formData.confirmPassword || ""}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          onBlur={() => setConfirmPasswordTouched(true)}
          error={confirmPasswordError}
          helperText={
            confirmPasswordError
              ? !formData.confirmPassword
                ? "This field is required"
                : "Passwords do not match"
              : ""
          }
          sx={{
            width: "300px",
            marginTop: "2rem",
            "& .MuiInputBase-input": {
              fontWeight: 600,
              color: "#374151",
            },
            "& .MuiInputLabel-root": { fontWeight: 500 },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#D1D5DB" },
              "&:hover fieldset": { borderColor: "#2563EB" },
              "&.Mui-focused fieldset": { borderColor: "#1E3A8A" },
              "&.Mui-error fieldset": { borderColor: "#DC2626" },
            },
          }}
        />
        {passwordErrorMessage && (
          <p className="text-red-500 font-semibold text-[12px] pt-2 flex items-start justify-start">
            {passwordErrorMessage}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full max-w-[300px] text-center py-2 rounded-md font-semibold mt-5 ${isError || !formData.password || !formData.confirmPassword
            ? "bg-[#E0E0E0] text-[#A6A6A6] cursor-not-allowed"
            : "text-white bg-primary bg-primary-hover cursor-pointer transition-all duration-150"
            }`}
          disabled={isError || !formData.password || !formData.confirmPassword}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CandidateOnboardingPassword;
