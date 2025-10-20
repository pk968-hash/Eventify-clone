import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { MdOutlineRefresh } from "react-icons/md";
import { TextField } from "@mui/material";

const CandidateOnboardingEmail = ({
  setStep,
  formData,
  setFormData,
  handleRestartOnboard,
}) => {
  const [touched, setTouched] = useState(false);

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isError = touched && (!formData.email || !isValidEmail(formData.email));

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (!isError) {
      setStep("AccountDetails");
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
          Provide your email
        </h1>
        <TextField
          label="Email *"
          disabled={formData.email}
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          onBlur={() => setTouched(true)}
          error={isError}
          helperText={isError ? "Enter a valid email address" : ""}
          sx={{
            width: "300px",
            "& .MuiInputBase-input": {
              fontWeight: 600,
              color: "#374151", // text color (gray-700)
              "&::placeholder": {
                color: "#9CA3AF", // placeholder color (gray-400)
                opacity: 1,
              },
            },
            "& .MuiInputLabel-root": {
              fontWeight: 500,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#D1D5DB", // default border (gray-300)
              },
              "&:hover fieldset": {
                borderColor: "#2563EB", // hover border (blue-600)
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1E3A8A", // focus border (blue-900)
              },
              "&.Mui-error fieldset": {
                borderColor: "#DC2626", // error border (red-600)
              },
            },
            marginTop: "1.5rem",
          }}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full max-w-[300px] text-center py-2 rounded-md font-semibold mt-5 ${
            isError || !formData.email
              ? "bg-[#E0E0E0] text-[#A6A6A6] cursor-not-allowed"
              : "text-white bg-primary bg-primary-hover cursor-pointer transition-all duration-150"
          }`}
          disabled={isError || !formData.email}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CandidateOnboardingEmail;
