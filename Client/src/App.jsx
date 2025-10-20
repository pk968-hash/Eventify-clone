import { Routes, Route, useLocation, Navigate } from "react-router";
import Home from "./pages/Home/Home";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Registration from "./pages/Registration/Registration";
import PageLoader from "./components/Layout/PageLoader";
import { useAuth } from "./context/AuthContext";
import ProtectedRoutes from "./components/RoutesProctection/ProtectedRoutes";
import NotFound from "./pages/NotFound/NotFound";
import ForEmployers from "./pages/ForEmployers/ForEmployers";
import CandidateDashboard from "./pages/Dashboard/JobseekerDashboard/CandidateDashboard";
import EmployerDashboard from "./pages/Dashboard/EmployerDashboard/EmployerDashboard";
import CandidateOnboarding from "./pages/CandidateOnboarding/CandidateOnboarding";
import JobOffers from "./pages/JobOffers/JobOffers";
import EmployerOnboarding from "./pages/EmployerOnboarding/EmployerOnboarding";

const HIDE_NAVBAR = [
  "/candidate/onboarding",
  "/candidate/profile",
  "/employer/profile",
  "/employer/onboarding",
  "/employer/jobs-posted",
  "/candidate/jobs",
  "/employer/post-job",
];
const HIDE_FOOTER = [
  "/login",
  "/candidate/onboarding",
  "/employer/onboarding",
  "/employer/profile",
  "/candidate/profile",
  "/employer/jobs-posted",
  "/candidate/jobs",
  "/employer/post-job",
];
const App = () => {
  const { pathname } = useLocation();
  const { authUser, authLoading } = useAuth();
  const isAuthenticated = Boolean(authUser);
  if (authLoading) return <PageLoader />;

  const getRedirectPath = (user) => {
    if (!user) return "/login";
    if (user.role === "Jobseeker") return "/candidate/profile";
    if (user.role === "Employer") return "/employer/profile";
    if (user.role === "Admin") return "/admin/profile";
    return "/";
  };

  return (
    <div>
      {/* NAVBAR */}
      {!HIDE_NAVBAR.includes(pathname) && <Navbar />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Registration />
            ) : (
              <Navigate to={getRedirectPath(authUser)} />
            )
          }
        />
        <Route path="/employers" element={<ForEmployers />} />
        <Route path="/job-offers" element={<JobOffers />} />

        {/* ONBOARDING ROUTES */}
        <Route
          path="/candidate/onboarding"
          element={
            !isAuthenticated ? (
              <CandidateOnboarding />
            ) : (
              <Navigate to="/candidate/profile" />
            )
          }
        />
        <Route
          path="/employer/onboarding"
          element={
            !isAuthenticated ? (
              <EmployerOnboarding />
            ) : (
              <Navigate to="/employer/profile" />
            )
          }
        />

        {/* PRIVATE EMPLOYER ROUTES */}
        <Route
          element={
            <ProtectedRoutes
              isAuthenticated={isAuthenticated}
              authUser={authUser}
              userType="Employer"
            />
          }
        >
          <Route path="/employer/*" element={<EmployerDashboard />} />
        </Route>

        {/* PRIVATE JOBSEEKER/CANDIDATE ROUTES */}
        <Route
          element={
            <ProtectedRoutes
              isAuthenticated={isAuthenticated}
              authUser={authUser}
              userType="Jobseeker"
            />
          }
        >
          <Route
            path="/candidate/*"
            element={
              <CandidateDashboard
                isAuthenticated={isAuthenticated}
                authUser={authUser}
              />
            }
          />
        </Route>

        {/* NOT FOUND PAGE */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* FOOTER */}
      {!HIDE_FOOTER.includes(pathname) && <Footer />}
    </div>
  );
};
export default App;
