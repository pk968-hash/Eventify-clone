import React, { useState } from "react";
import { useLocation } from "react-router";
import CandidateOnboardingSidebar from "./Components/CandidateOnboardingSidebar";
import CandidateOnboardingEmail from "./Components/CandidateOnboardingEmail";
import CandidateOnboardingAccountDetails from "./Components/CandidateOnboardingAccountDetails";
import CandidateOnboardingID from "./Components/CandidateOnboardingID";
import CandidateOnboardingPassword from "./Components/CandidateOnboardingPassword";
import CandidateOnBoardingVerfication from "./Components/CandidateOnBoardingVerfication";

const CandidateOnboarding = () => {
  const location = useLocation();
  const { navigationStep, email } = location.state || {};
  const [step, setStep] = useState(navigationStep || "AccountDetails");
  const [formData, setFormData] = useState({
    email: email || "",
    firstName: "",
    lastName: "",
    citizenship: "",
    nationalId: "",
    city: "",
    jobOffers: false,
    invitationCode: "",
    password: "",
    confirmPassword: "",
  });

  const handleRestartOnboard = () => {
    setFormData({
      email: email || "",
      firstName: "",
      lastName: "",
      citizenship: "",
      nationalId: "",
      city: "",
      jobOffers: false,
      invitationCode: "",
      password: "",
      confirmPassword: "",
    });
    setStep("Email");
    console.log("Onboarded");
  };

  return (
    <div className="w-full flex">
      {/* Sidebar */}
      <div className="w-[350px] shrink-0">
        <CandidateOnboardingSidebar step={step} setStep={setStep} />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {step === "Email" && (
          <CandidateOnboardingEmail
            handleRestartOnboard={handleRestartOnboard}
            step={step}
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === "AccountDetails" && (
          <CandidateOnboardingAccountDetails
            handleRestartOnboard={handleRestartOnboard}
            step={step}
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === "ID" && (
          <CandidateOnboardingID
            handleRestartOnboard={handleRestartOnboard}
            step={step}
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === "Verification" && (
          <CandidateOnBoardingVerfication
            handleRestartOnboard={handleRestartOnboard}
            step={step}
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
        {step === "Password" && (
          <CandidateOnboardingPassword
            handleRestartOnboard={handleRestartOnboard}
            step={step}
            setStep={setStep}
            formData={formData}
            setFormData={setFormData}
          />
        )}
      </div>
    </div>
  );
};

export default CandidateOnboarding;
