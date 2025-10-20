import React from "react";
import JobSearch from "./Components/JobSearch";
import JobBenefits from "./Components/JobBenefits";
import SecureIncome from "./Components/SecureIncome";
import Community from "./Components/Community";
import SuccessStory from "./Components/SuccessStory";
import GetJob from "./Components/GetJob";
import Positions from "./Components/Positions";
import FAQ from "./Components/FAQ";
import BottomSignup from "./Components/BottomSignup";


const Home = () => {
  return (
    <>
      <div className="px-64">
        <JobSearch />
        <JobBenefits />
        <SecureIncome />
        <Community />
        <SuccessStory />
        <GetJob />
        <Positions />
        <FAQ />
      </div>
      <div className="px-20">
        <BottomSignup />
      </div>
    </>
  );
};

export default Home;
