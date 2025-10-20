import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useState } from "react";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineRefresh } from "react-icons/md";

const CandidateOnboardingAccountDetails = ({
  setStep,
  formData,
  setFormData,
  handleRestartOnboard,
}) => {
  const [firstNameTouched, setFirstNameTouched] = useState(false);
  const [lastNameTouched, setLastNameTouched] = useState(false);

  const [agree, setAgree] = useState(false);

  const firstNameError = firstNameTouched && !formData.firstName;
  const lastNameError = lastNameTouched && !formData.lastName;

  const isError = firstNameError || lastNameError;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isError && formData.firstName && formData.lastName && agree) {
      setStep("ID"); // move forward only if no errors
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
            onClick={() => handleRestartOnboard("Email")}
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
          Enter identity information
        </h1>

        {/* First Name */}
        <TextField
          label="First Name *"
          value={formData.firstName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, firstName: e.target.value }))
          }
          onBlur={() => setFirstNameTouched(true)}
          error={firstNameError}
          helperText={firstNameError ? "This field is required" : ""}
          sx={{
            width: "300px",
            "& .MuiInputBase-input": {
              fontWeight: 600,
              color: "#374151",
              "&::placeholder": {
                color: "#9CA3AF",
                opacity: 1,
              },
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
            marginTop: "2rem",
          }}
        />

        {/* Last Name */}
        <TextField
          label="Last Name *"
          value={formData.lastName}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, lastName: e.target.value }))
          }
          onBlur={() => setLastNameTouched(true)}
          error={lastNameError}
          helperText={lastNameError ? "This field is required" : ""}
          sx={{
            width: "300px",
            "& .MuiInputBase-input": {
              fontWeight: 600,
              color: "#374151",
              "&::placeholder": {
                color: "#9CA3AF",
                opacity: 1,
              },
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
            marginTop: "2rem",
          }}
        />

        {/* Checkbox */}
        <FormControlLabel
          control={
            <Checkbox
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              sx={{
                color: "#9CA3AF", // unchecked box color (gray-400)
                "&.Mui-checked": {
                  color: "#7AC943", // checked box + tick color (blue-900)
                },
                "& .MuiSvgIcon-root": {
                  fontSize: 24, // optional: make checkbox bigger
                },
              }}
            />
          }
          label="By signing in, I agree to the terms and conditions"
          sx={{
            "& .MuiFormControlLabel-label": {
              fontWeight: 400,
              color: "#1E3A8A",
              fontSize: "0.75rem",
            },
          }}
          className="mt-4"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full max-w-[300px] text-center py-2 rounded-md font-semibold mt-3 ${
            isError || !formData.firstName || !formData.lastName || !agree
              ? "bg-[#E0E0E0] text-[#A6A6A6] cursor-not-allowed"
              : "text-white bg-primary bg-primary-hover cursor-pointer transition-all duration-150"
          }`}
          disabled={
            isError || !formData.firstName || !formData.lastName || !agree
          }
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default CandidateOnboardingAccountDetails;
