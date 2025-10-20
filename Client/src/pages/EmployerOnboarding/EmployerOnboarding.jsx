import React, { useState } from "react";
import EmployerOnboardingDetails from "./Components/EmployerOnboardingDetails";
import EmployerOnboardingPassword from "./Components/EmployerOnboardingPassword";
import EmployerOnboardingSidebar from "./Components/EmployerOnboardingSidebar";
import { useLocation } from "react-router";

const EmployerOnboarding = () => {
  const [step, setStep] = useState("Details"); // 2. Password
  const location = useLocation();
  const { userDetails } = location.state || {};

  const [formData, setFormData] = useState({
    name: userDetails?.name,
    companyName: userDetails?.companyName,
    companyImage: "",
    companyCode: "",
    VATCode: "",
    address: "",
    description: "",
    logo: "",
    email: userDetails?.email,
    phone: userDetails?.phone,
    password: "",
    confirmPassword: "",
  });

  const handleRestartOnboard = () => {
    setFormData({
      name: userDetails?.name,
      companyName: userDetails?.companyName,
      companyCode: "",
      VATCode: "",
      address: "",
      description: "",
      logo: "",
      email: userDetails?.email,
      phone: userDetails?.phone,
      password: "",
      confirmPassword: "",
      companyImage: "",
    });
    setStep("Details");
  };
  return (
    <div className="w-full flex">
      {/* Sidebar */}
      <div className="w-[350px] shrink-0">
        <EmployerOnboardingSidebar step={step} />
      </div>

      {/* Main Content */}

      <div className="flex-1">
        {/* Addition Details */}
        {step === "Details" && (
          <EmployerOnboardingDetails
            formData={formData}
            setFormData={setFormData}
            step={step}
            setStep={setStep}
          />
        )}
        {step === "Password" && (
          <EmployerOnboardingPassword
            formData={formData}
            setFormData={setFormData}
            handleRestartOnboard={handleRestartOnboard}
            setStep={setStep}
          />
        )}
      </div>
    </div>
  );
};

export default EmployerOnboarding;
