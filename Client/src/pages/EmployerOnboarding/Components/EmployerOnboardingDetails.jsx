import { TextField } from "@mui/material";
import { useState } from "react";
import companyPlaceholder from "../../../assets/companyPlaceholder.webp";

const EmployerOnboardingDetails = ({ formData, setFormData, setStep }) => {
  // Track touched state for validation
  const [touched, setTouched] = useState({
    companyName: false,
    companyCode: false,
    VATCode: false,
    address: false,
    email: false,
    phone: false,
  });

  const [companyImagePreview, setCompanyImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleCompanyImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCompanyImagePreview(reader.result); // show preview
      };
      reader.readAsDataURL(file);
      setSelectedFile(file); // keep actual file
    }
  };

  // Validation errors
  const errors = {
    companyName: touched.companyName && !formData.companyName,
    companyCode: touched.companyCode && !formData.companyCode,
    VATCode: touched.VATCode && !formData.VATCode,
    address: touched.address && !formData.address,
    email:
      touched.email &&
      (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)),
    phone:
      touched.phone &&
      (!formData.phone || !/^[0-9]{7,15}$/.test(formData.phone)), // simple phone regex
  };

  const isError = Object.values(errors).some(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isError) {
      if (!selectedFile) {
        return alert("Please select a company image");
      }
      const updatedData = { ...formData, companyImage: selectedFile };
      setFormData(updatedData);
      setStep("Password"); // move to next step
    }
  };

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

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex flex-col items-center"
      >
        <h1 className="text-[#013573] font-semibold text-2xl mb-2">
          Enter Company Details
        </h1>
        {/* Company Image */}
        <div>
          <label htmlFor="companyImage" className="cursor-pointer">
            <img
              src={companyImagePreview || companyPlaceholder}
              alt="companyImage"
              className="w-26 h-26 lg:w-40 lg:h-40 object-cover border border-gray-200 rounded-md"
              draggable="false"
            />
            <input
              type="file"
              id="companyImage"
              name="companyImage"
              accept="image/*"
              className="hidden"
              onChange={handleCompanyImageChange}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
          {/* Company Name */}
          <TextField
            label="Company Name"
            value={formData.companyName}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, companyName: e.target.value }))
            }
            onBlur={() =>
              setTouched((prev) => ({ ...prev, companyName: true }))
            }
            error={errors.companyName}
            helperText={errors.companyName ? "This field is required" : ""}
            sx={inputStyles}
            required
            disabled
          />

          {/* Company Code */}
          <TextField
            label="Company Code"
            value={formData.companyCode}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, companyCode: e.target.value }))
            }
            onBlur={() =>
              setTouched((prev) => ({ ...prev, companyCode: true }))
            }
            error={errors.companyCode}
            helperText={errors.companyCode ? "This field is required" : ""}
            sx={inputStyles}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
          {/* VAT Code */}
          <TextField
            label="VAT Code"
            value={formData.VATCode}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, VATCode: e.target.value }))
            }
            onBlur={() => setTouched((prev) => ({ ...prev, VATCode: true }))}
            error={errors.VATCode}
            helperText={errors.VATCode ? "This field is required" : ""}
            sx={inputStyles}
            required
          />

          {/* Address */}
          <TextField
            label="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
            onBlur={() => setTouched((prev) => ({ ...prev, address: true }))}
            error={errors.address}
            helperText={errors.address ? "This field is required" : ""}
            sx={inputStyles}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
          {/* Company Email */}
          <TextField
            label="Company Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
            error={errors.email}
            helperText={errors.email ? "Enter a valid email" : ""}
            sx={inputStyles}
            required
            disabled
          />

          {/* Company Phone */}
          <TextField
            label="Company Phone"
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
            error={errors.phone}
            helperText={errors.phone ? "Enter a valid phone number" : ""}
            sx={inputStyles}
            required
            disabled
          />
        </div>

        {/* Description (optional) */}
        <TextField
          label="Company Description"
          multiline
          rows={3}
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          sx={inputStyles}
          required
        />

        {/* Continue Button */}
        <button
          type="submit"
          className={`w-full text-center py-2 rounded-md font-semibold mt-6 ${
            isError
              ? "bg-[#E0E0E0] text-[#A6A6A6] cursor-not-allowed"
              : "text-white bg-primary bg-primary-hover cursor-pointer transition-all duration-150"
          }`}
          disabled={isError}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default EmployerOnboardingDetails;
