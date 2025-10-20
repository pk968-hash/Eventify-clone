import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaArrowRight } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext";
import { checkAvailability, JobseekerLogin } from "../../../lib/api";

const CandidateRegistration = ({ setRegistrationPageStage }) => {
  const { setAuthUser } = useAuth();

  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);

  const [pageStage, setPageStage] = useState("login"); // 2. forgot-password

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // ---------- Forgot Password State ----------
  const [forgotEmail, setForgotEmail] = useState();
  const [forgotEmailTouched, setForgotEmailTouched] = useState(false);
  const [forgotEmailError, setForgotEmailError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateEmail = (value) => {
    if (!value) return "Please fill in your email";
    if (!emailRegex.test(value)) return "Invalid email address";
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handleEmailBlur = () => setEmailError(validateEmail(email));

  const navigate = useNavigate();

  const isContinueDisabled = emailError || !email;
  const isLoginDisabled = !password;

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setErrorMessage("");
    try {
      const response = await checkAvailability({ email });
      if (response.userAvailable === true && response.isEmployer === false) {
        setShowPasswordField(true);
      } else if (
        response.userAvailable === true &&
        response.isEmployer === true
      ) {
        setErrorMessage(response?.message || "Please sign in as Employer");
      } else {
        console.log("sending to onboard");
        navigate("/candidate/onboarding", {
          state: { navigationStep: "AccountDetails", email: email },
        });
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Please sign in as Employer"
      );
      console.log(error);
    }
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    try {
      const response = await JobseekerLogin({ email, password });
      setAuthUser(response?.user);
      navigate("/candidate/profile");
    } catch (error) {
      setPasswordError(error.response?.data?.message);
      console.log(error);
    }
  };

  const handleForgotEmail = () => {
    e.preventDefault();
  };

  return (
    <div>
      {pageStage === "login" && (
        <form
          onSubmit={showPasswordField ? handleLoginSubmit : handleEmailSubmit}
        >
          <div className="mt-4 flex flex-col items-center justify-center bg-white w-full max-w-[20.5rem] mx-auto rounded-2xl p-6">
            <h1 className="text-xl font-bold text-center text-primary mt-2">
              Log in or sign up to find a temporary job quickly
            </h1>

            {/* Step 1: Email → Step 2: Password */}
            {showPasswordField ? (
              <div className="w-full mt-6">
                <input
                  type="password"
                  placeholder="Password"
                  className={`border w-full px-6 py-4 rounded-md text-[#013573] font-bold bg-[#F6F8FA] placeholder:text-gray-500 focus:outline-none ${
                    passwordError ? "border-red-500" : ""
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <p className="text-red-500 text-[11px] pl-3 pt-1">
                    {passwordError}
                  </p>
                )}
                <p className="text-sm mt-4">
                  Please enter your Workis.online password for <b>{email}</b> to
                  continue
                </p>
                <button
                  type="button"
                  className="text-[11px] text-blue-800 mx-auto flex underline mt-3 cursor-pointer"
                  onClick={() => setPageStage("forgotPassword")}
                >
                  Forgot password ?
                </button>
              </div>
            ) : (
              <div className="w-full mt-6">
                <input
                  type="text"
                  placeholder="Email"
                  className={`border w-full px-6 py-4 rounded-md text-[#013573] font-bold bg-[#F6F8FA] placeholder:text-gray-400 focus:outline-none ${
                    emailError ? "border-red-500" : ""
                  }`}
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                />
                {emailError && (
                  <p className="text-red-500 font-semibold text-[10px] pl-3 pt-1">
                    {emailError}
                  </p>
                )}
                {errorMessage && (
                  <p className="text-red-500 font-semibold text-[10px] pl-3 pt-1">
                    {errorMessage}
                  </p>
                )}
              </div>
            )}

            {/* Terms */}
            <p className="text-[12px] text-center font-bold mt-5">
              By signing in, I agree to the{" "}
              <Link className="underline">terms and conditions</Link>
            </p>

            {showPasswordField ? (
              // Login Button
              <button
                type="submit"
                className={`w-full text-center py-4 rounded-md text-lg font-semibold mt-5 ${
                  isLoginDisabled
                    ? "bg-[#E0E0E0] text-[#A6A6A6] cursor-not-allowed"
                    : "text-white bg-primary bg-primary-hover cursor-pointer transition-all duration-150"
                }`}
                disabled={isLoginDisabled}
              >
                Log in
              </button>
            ) : (
              // Continue Button
              <button
                type="submit"
                className={`w-full text-center py-4 rounded-md text-lg font-semibold mt-5 ${
                  isContinueDisabled
                    ? "bg-[#E0E0E0] text-[#A6A6A6] cursor-not-allowed"
                    : "text-white bg-primary bg-primary-hover cursor-pointer transition-all duration-150"
                }`}
                disabled={isContinueDisabled}
              >
                Continue
              </button>
            )}

            {/* OR Divider */}
            <div className="flex items-center justify-center my-4 text-[#817f7f] w-full gap-2">
              <hr className="w-full h-[1px]" />
              <p>OR</p>
              <hr className="w-full h-[1px]" />
            </div>

            {/* Social Login */}
            <div className="flex items-center justify-center gap-2 border py-4 rounded-md w-full cursor-pointer">
              <FcGoogle size={25} />
              <p className="font-bold">Continue with Google</p>
            </div>
            <div className="flex items-center justify-center gap-2 border py-4 rounded-md w-full mt-2 text-[#013573] cursor-pointer">
              <FaFacebook size={25} />
              <p className="font-bold">Continue with Facebook</p>
            </div>
          </div>

          {/* Switch to Employer */}
          <div
            className="mt-4 flex items-center gap-2 bg-primary text-white font-bold w-full max-w-[20.5rem] mx-auto rounded-md px-6 py-4 cursor-pointer"
            onClick={() => setRegistrationPageStage("Employer")}
          >
            Sign in as an employer
            <FaArrowRight />
          </div>
        </form>
      )}
      {/* ---------- Job Seeker Forgot Password ---------- */}
      {pageStage === "forgotPassword" && (
        <form
          onSubmit={handleEmailSubmit}
          className="flex flex-col items-center justify-center"
        >
          <div className="mt-4 flex flex-col items-center justify-center bg-white w-full max-w-[20.5rem] mx-auto rounded-2xl p-6">
            <h1 className="text-xl font-bold text-center text-primary mt-2 leading-tight">
              Log in or sign up to find a temporary job quickly
            </h1>
            <h1 className="text-2xl font-extrabold text-[#013573] mt-8 text-center">
              Forgot Password?
            </h1>
            <input
              type="email"
              placeholder="Email"
              className={`border w-full px-6 py-4 rounded-md text-[#013573] font-bold placeholder:text-gray-500 focus:outline-none mt-5 ${
                !forgotEmail && forgotEmailTouched ? "border-red-500" : ""
              }`}
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              onBlur={() => setForgotEmailTouched(true)}
            />
            {forgotEmailError && (
              <p className="text-red-500 font-semibold text-[10px] pl-3 pt-1">
                {forgotEmailError}
              </p>
            )}
            <p className="text-left text-[10px] text-[#817f7f] mt-1 px-3 font-bold">
              We will send you the password reset link to your email, if it is
              registered in our system
            </p>
            <button
              type="submit"
              className={`w-full text-center py-4 rounded-md text-lg font-semibold mt-5 ${
                !forgotEmail
                  ? "bg-[#E0E0E0] text-[#A6A6A6] cursor-not-allowed"
                  : "text-white bg-primary cursor-pointer"
              }`}
              disabled={!forgotEmail}
            >
              Remind Password
            </button>
          </div>
          <div
            className="mt-4 flex items-center gap-2 bg-primary text-white font-bold w-full max-w-[20.5rem] mx-auto rounded-md px-6 py-4 cursor-pointer"
            onClick={() => setRegistrationPageStage("Employer")}
          >
            Sign in as an employer
            <FaArrowRight />
          </div>
        </form>
      )}
    </div>
  );
};

export default CandidateRegistration;
