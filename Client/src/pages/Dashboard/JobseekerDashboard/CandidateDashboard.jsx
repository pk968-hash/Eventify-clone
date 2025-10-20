import React from "react";
import CandidateDashSidebar from "./Components/CandidateDashSidebar";
import CandidateProfile from "./Components/CandidateProfile";
import { Route, Routes } from "react-router";
import CandidateOnboarding from "../../CandidateOnboarding/CandidateOnboarding";
import CandidateJobs from "./Components/CandidateJobs";

const CandidateDashboard = ({ isAuthenticated }) => {
  return (
    <div className="flex ">
      <div className="w-full max-w-[15rem]">
        <CandidateDashSidebar className="w-full" />
      </div>
      <div className="flex items-start w-full bg-[#EAEEF3]">
        <Routes>
          <Route path="/profile" element={<CandidateProfile />} />
          <Route path="/jobs" element={<CandidateJobs />} />
        </Routes>
      </div>
    </div>
  );
};

export default CandidateDashboard;
