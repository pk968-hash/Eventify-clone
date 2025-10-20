import React, { useEffect, useState } from "react";
import { TextField, MenuItem, FormControlLabel, Switch } from "@mui/material";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineRefresh } from "react-icons/md";
import { VerifyPersonalId } from "../../../lib/api";
import { cities, Citizenship } from "../../../Data";

const CandidateOnboardingID = ({
  setStep,
  formData,
  setFormData,
  handleRestartOnboard,
}) => {
  const [citizenshipTouched, setCitizenshipTouched] = useState(false);
  const [nationalIdTouched, setNationalIdTouched] = useState(false);
  const [cityTouched, setCityTouched] = useState(false);

  const [idCheckedResult, setIdCheckedResult] = useState("");

  const citizenshipError = citizenshipTouched && !formData.citizenship;
  const nationalIdError = nationalIdTouched && !formData.nationalId;
  const cityError = cityTouched && !formData.city;

  const isError = citizenshipError || nationalIdError || cityError;

  useEffect(() => {
    if (!formData.nationalId) {
      setIdCheckedResult(null);
      return;
    }
    const delayDebounce = setTimeout(async () => {
      setIdCheckedResult(null);
      try {
        const response = await VerifyPersonalId(formData.nationalId);
        if (response.status === 200) {
          setIdCheckedResult("Personal ID is available");
        }
      } catch (error) {
        setIdCheckedResult(
          error.response?.data?.message || "Invalid Personal ID"
        );
        console.error(error.response?.data);
      }
    }, 100);

    return () => clearTimeout(delayDebounce);
  }, [formData.nationalId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !isError &&
      formData.citizenship &&
      formData.nationalId &&
      formData.city
    ) {
      setStep("Verification"); // move to next step
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
          Set up your account
        </h1>

        {/* Citizenship */}
        <TextField
          select
          label="Citizenship *"
          value={formData.citizenship || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, citizenship: e.target.value }))
          }
          onBlur={() => setCitizenshipTouched(true)}
          error={citizenshipError}
          helperText={citizenshipError ? "This field is required" : ""}
          sx={{
            width: "300px",
            marginTop: "2rem",
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
          }}
        >
          <MenuItem value={"Lithuania"}>Lithuania</MenuItem>
        </TextField>

        {/* National ID */}
        <TextField
          label="National ID *"
          value={formData.nationalId || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, nationalId: e.target.value }))
          }
          onBlur={() => setNationalIdTouched(true)}
          error={
            !!(
              nationalIdError ||
              (idCheckedResult && idCheckedResult.includes("use"))
            )
          }
          helperText={
            nationalIdError ? "This field is required" : idCheckedResult || ""
          }
          sx={{
            width: "300px",
            marginTop: "1rem",
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

        {/* City */}
        <TextField
          select
          label="Which city do you want to work in *"
          value={formData.city || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, city: e.target.value }))
          }
          onBlur={() => setCityTouched(true)}
          error={cityError}
          helperText={cityError ? "This field is required" : ""}
          sx={{
            width: "300px",
            marginTop: "1rem",
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
        >
          {cities.map((item) => (
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>

        {/* Toggle Job Offers */}
        <FormControlLabel
          control={
            <Switch
              checked={formData.jobOffers || false}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  jobOffers: e.target.checked,
                }))
              }
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "#7AC943", // green switch handle
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "#7AC943",
                },
              }}
            />
          }
          label="I want to get newest job offers"
          sx={{
            marginTop: "1rem",
            "& .MuiFormControlLabel-label": {
              fontWeight: 500,
              color: "#1E3A8A",
              fontSize: "0.85rem",
            },
          }}
        />

        {/* Invitation Code */}
        <TextField
          label="Invitation received? Enter code!"
          value={formData.invitationCode || ""}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, invitationCode: e.target.value }))
          }
          sx={{
            width: "300px",
            marginTop: "1rem",
            "& .MuiInputBase-input": {
              fontWeight: 600,
              color: "#374151",
            },
            "& .MuiInputLabel-root": { fontWeight: 500 },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#D1D5DB" },
              "&:hover fieldset": { borderColor: "#2563EB" },
              "&.Mui-focused fieldset": { borderColor: "#1E3A8A" },
            },
          }}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full max-w-[300px] text-center py-2 rounded-md font-semibold mt-5 ${
            isError ||
            !formData.citizenship ||
            !formData.nationalId ||
            !formData.city ||
            idCheckedResult !== null
              ? "bg-[#E0E0E0] text-[#A6A6A6] cursor-not-allowed"
              : "text-white bg-primary bg-primary-hover cursor-pointer transition-all duration-150"
          }`}
          disabled={
            isError ||
            !formData.citizenship ||
            !formData.nationalId ||
            !formData.city ||
            idCheckedResult !== null
          }
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default CandidateOnboardingID;
