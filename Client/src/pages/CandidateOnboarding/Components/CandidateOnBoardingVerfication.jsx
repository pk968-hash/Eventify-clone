import { useState } from "react";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineRefresh } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { Button, TextField } from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import companyPlaceholder from "../../../assets/companyPlaceholder.webp";

const CandidateOnBoardingVerification = ({
  setStep,
  formData,
  setFormData,
  handleRestartOnboard,
}) => {
  const [depositImagePreview, setDepositImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [depositSenderDetails, setDepositSenderDetails] = useState({
    bankName: "",
    accountTitle: "",
    accountNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDepositSenderDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepositImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setDepositImagePreview(reader.result);
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !depositSenderDetails.bankName ||
      !depositSenderDetails.accountTitle ||
      !depositSenderDetails.accountNumber
    ) {
      return alert("Please fill in all sender bank details.");
    }

    if (!selectedImage) {
      return alert("Please upload a screenshot of your deposit proof.");
    }

    const updatedData = {
      ...formData,
      bankDepositImage: selectedImage,
      senderBankDetails: depositSenderDetails,
    };
    setFormData(updatedData);
    setStep("Password");
  };

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center relative px-4">
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
            type="button"
            onClick={handleRestartOnboard}
            className="underline cursor-pointer"
          >
            Restart onboarding
          </button>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center pt-28"
      >
        <h1 className="text-[#013573] font-semibold text-2xl mb-4 text-center">
          Send a €50 Verification Deposit
        </h1>
        <p className="text-gray-700 text-center max-w-xl mb-6 text-sm">
          To complete your account verification and unlock access to job
          applications and advertisement features, please make a one-time
          deposit of <span className="font-semibold text-[#013573]">€50</span>{" "}
          to the account below and upload your payment confirmation.
        </p>

        {/* Bank Info Card */}
        <div className="bg-gray-100 border border-gray-300 rounded-xl shadow-sm p-5 w-full max-w-md mb-8">
          <h2 className="text-[#013573] font-semibold flex items-center gap-2 text-lg mb-3">
            <FaUniversity size={18} /> Bank Details
          </h2>
          <div className="flex flex-col gap-3 text-gray-800 text-sm">
            <div className="flex items-center gap-2">
              <MdAccountBalance className="text-primary" size={18} />
              <p>
                <span className="font-semibold">Account Name:</span> MB MOKAMA
              </p>
            </div>
            <div className="flex items-center gap-2 break-all">
              <MdAccountBalance className="text-primary" size={18} />
              <p>
                <span className="font-semibold">Account Number:</span>{" "}
                LT647300010190917408
              </p>
            </div>
          </div>
        </div>

        {/* Sender Details */}
        <div className="w-full max-w-md flex flex-col gap-4 mb-8">
          <TextField
            label="Sender Bank Name"
            name="bankName"
            value={depositSenderDetails.bankName}
            onChange={handleInputChange}
            required
            sx={{
              "& label.Mui-focused": { color: "#013573" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#013573" },
                "&:hover fieldset": { borderColor: "#013573" },
                "&.Mui-focused fieldset": { borderColor: "#013573" },
              },
            }}
          />
          <TextField
            label="Sender Account Title"
            name="accountTitle"
            value={depositSenderDetails.accountTitle}
            onChange={handleInputChange}
            required
            sx={{
              "& label.Mui-focused": { color: "#013573" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#013573" },
                "&:hover fieldset": { borderColor: "#013573" },
                "&.Mui-focused fieldset": { borderColor: "#013573" },
              },
            }}
          />
          <TextField
            label="Sender Account Number"
            name="accountNumber"
            value={depositSenderDetails.accountNumber}
            onChange={handleInputChange}
            required
            sx={{
              "& label.Mui-focused": { color: "#013573" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#013573" },
                "&:hover fieldset": { borderColor: "#013573" },
                "&.Mui-focused fieldset": { borderColor: "#013573" },
              },
            }}
          />
        </div>

        {/* Upload Proof */}
        <div className="flex flex-col items-center gap-4">
          <label htmlFor="depositImage" className="cursor-pointer">
            <img
              src={depositImagePreview || companyPlaceholder}
              alt="Deposit proof"
              className="w-full max-h-80 object-cover border border-gray-300 rounded-md shadow-sm hover:shadow-md transition"
              draggable="false"
            />
          </label>

          <Button
            variant="outlined"
            component="label"
            startIcon={<UploadFileIcon />}
            sx={{
              color: "#013573",
              borderColor: "#013573",
              "&:hover": { borderColor: "#013573", background: "#f1f5f9" },
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            {selectedImage ? "Change Image" : "Upload Proof Image"}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleDepositImageChange}
            />
          </Button>
        </div>

        {/* Next Button */}
        <button
          type="submit"
          className="mt-10 bg-[#013573] hover:bg-[#02418d] text-white font-semibold py-2 px-10 rounded-lg transition"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default CandidateOnBoardingVerification;
