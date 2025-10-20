import { Route, Routes, useLocation } from "react-router";
import EmployerDashSidebar from "./Components/EmployerDashSidebar";
import EmployerProfile from "./Components/EmployerProfile";
import JobsDash from "./Components/JobsDash";
import EmployerJobPostDash from "./Components/EmployerJobPostDash";

const EmployerDashboard = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex">
      <div className="w-full max-w-[15rem]">
        <EmployerDashSidebar className="w-full" />
      </div>

      <div className="flex items-start w-full bg-[#EAEEF3]">
        <Routes>
          <Route path="/profile" element={<EmployerProfile />} />
          <Route path="/jobs-posted" element={<JobsDash />} />
          <Route path="/post-job" element={<EmployerJobPostDash />} />
        </Routes>
      </div>
    </div>
  );
};

export default EmployerDashboard;
