import { FaFacebookSquare, FaArrowRight } from "react-icons/fa";
import { IoMdMail, IoMdCall } from "react-icons/io";
import { useState } from "react";
import logo from "../../../assets/logo.png";
import { EmployerLogin } from "../../../lib/api";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router";

const EmployerRegistration = ({ setRegistrationPageStage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [loginError, setLoginError] = useState("");

  const { setAuthUser } = useAuth();

  const [pageStage, setPageStage] = useState("login"); // 2. Forgot password

  const navigate = useNavigate();

  // ---------- Forgot Password State ----------
  const [forgotEmail, setForgotEmail] = useState();
  const [forgotEmailError, setForgotEmailError] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    try {
      const response = await EmployerLogin({ email: username, password });
      setAuthUser(response.user);
      navigate("/employer/profile");
      console.log(response);
    } catch (error) {
      setLoginError(error.response?.data?.message);
      console.log(error);
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      {pageStage === "login" && (
        <>
          <form
            onSubmit={handleLoginSubmit}
            className="mt-16 flex flex-col items-center justify-center bg-white w-full max-w-[20.5rem] mx-auto rounded-2xl px-6 pt-9 pb-13"
          >
            <input
              type="email"
              placeholder="Email"
              className={`border w-full px-6 py-4 rounded-md text-[#013573] font-bold placeholder:text-gray-500 focus:outline-none ${
                usernameTouched && !username ? "border-red-500" : ""
              }`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setUsernameTouched(true)}
            />

            <input
              type="password"
              placeholder="Password"
              className={`border w-full px-6 py-4 rounded-md text-[#013573] font-bold placeholder:text-gray-500 focus:outline-none mt-5 ${
                passwordTouched && !password ? "border-red-500" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
            />
            {loginError && (
              <p className="text-red-500 font-semibold text-sm pt-2">
                {loginError}
              </p>
            )}

            <button
              className="text-center font-bold underline mt-6 cursor-pointer"
              onClick={() => setPageStage("forgotPassword")}
              type="button"
            >
              Forgot Password?
            </button>

            <button
              type="submit"
              className={`w-full text-center py-4 rounded-md text-lg font-semibold mt-5 ${
                !username || !password
                  ? "bg-[#E0E0E0] text-[#A6A6A6] cursor-not-allowed"
                  : "text-white bg-primary bg-primary-hover cursor-pointer transition-all duration-150"
              }`}
              disabled={!username || !password}
            >
              Log in
            </button>

            <p className="text-center text-sm text-[#817f7f] mt-5">
              Have some questions or suggestion?
            </p>
            <div className="flex items-center justify-center gap-10 w-full mt-2 text-[#817f7f]">
              <IoMdMail size={22} />
              <IoMdCall size={22} />
              <FaFacebookSquare size={22} />
            </div>
          </form>

          {/* Switch to Job Seeker */}
          <div
            className="mt-4 flex items-center gap-2 bg-[#41629E] text-white font-bold w-full max-w-[20.5rem] mx-auto rounded-md px-6 py-4 cursor-pointer"
            onClick={() => setRegistrationPageStage("JobSeeker")}
          >
            For job seekers
            <FaArrowRight />
          </div>
        </>
      )}
      {pageStage === "forgotPassword" && (
        <form
          onSubmit={handleForgotPasswordSubmit}
          className="mt-24 flex flex-col items-center justify-center bg-white w-full max-w-[20.5rem] mx-auto rounded-2xl px-8 pt-9 pb-26"
        >
          <img src={logo} alt="logo" className="w-36" draggable="false" />

          <input
            type="text"
            className="border-b w-full font-bold text-sm py-1 text-[#013573] placeholder:text-gray-500 focus:outline-none mt-5"
            placeholder="Email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
          />
          <p className="text-left text-[10px] text-[#817f7f] mt-1">
            We will send you the password reset link to your email, if it is
            registered in our system
          </p>

          <button
            className={`w-full text-center py-4 rounded-md text-lg font-semibold mt-5 ${
              !forgotEmail
                ? "bg-[#E0E0E0] text-[#A6A6A6] cursor-not-allowed"
                : "text-white bg-primary cursor-pointer"
            }`}
            disabled={!forgotEmail}
          >
            Remind Password
          </button>
        </form>
      )}
    </div>
  );
};

export default EmployerRegistration;
