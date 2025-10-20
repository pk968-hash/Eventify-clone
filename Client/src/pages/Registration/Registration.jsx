import React, { useState } from "react";
import CandidateRegistration from "./CandidateRegistration/CandidateRegistration";
import EmployerRegistration from "./EmployerRegistration/EmployerRegistration";

const Registration = () => {
  const [pageStage, setPageStage] = useState("JobSeeker");

  return (
    <div>
      {pageStage === "JobSeeker" && (
        <CandidateRegistration setRegistrationPageStage={setPageStage} />
      )}
      {pageStage === "Employer" && (
        <EmployerRegistration setRegistrationPageStage={setPageStage} />
      )}
    </div>
  );
};

export default Registration;
