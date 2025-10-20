import logo from "../../../../assets/logo.png";
import { IoBagSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdEuro } from "react-icons/md";
import { IoPersonCircleSharp } from "react-icons/io5";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { FaFacebookSquare } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { Link, useLocation } from "react-router";
import { Logout } from "../../../../lib/api";
import { useAuth } from "../../../../context/AuthContext";

const CandidateDashSidebar = () => {
  const { pathname: currentPath } = useLocation();
  const { setAuthUser } = useAuth();
  const handleLogout = async () => {
    try {
      await Logout();
      setAuthUser(null);
    } catch (error) {
      setAuthUser(null);
      console.log(error);
    }
  };
  // test
  return (
    <div className="w-full max-w-[15rem] bg-white min-h-screen flex flex-col justify-between fixed">
      {/* TOP */}
      <div>
        {/* LOGO */}
        <Link to="/" className="w-full flex items-center justify-center py-4">
          <img src={logo} alt="logo" className="w-44 object-contain" draggable="false" />
        </Link>
        {/* OPTIONS */}
        <div>
          <Link
            to="/candidate/jobs"
            className={`flex items-center gap-3 text-primary w-full px-10 py-2 hover:bg-blue-50 ${
              currentPath === "/candidate/jobs" && "bg-blue-50"
            }`}
          >
            <IoBagSharp size={20} />
            <p className="font-semibold">JOBS</p>
          </Link>
          <Link
            className={`flex items-center gap-3 text-primary w-full px-10 py-2 hover:bg-blue-50 ${
              currentPath === "" && "bg-blue-50"
            }`}
          >
            <GiHamburgerMenu size={20} />
            <p className="font-semibold">MY JOBS</p>
          </Link>
          <Link
            className={`flex items-center gap-3 text-primary w-full px-10 py-2 hover:bg-blue-50 ${
              currentPath === "" && "bg-blue-50"
            }`}
          >
            <MdEuro size={20} />
            <p className="font-semibold">PAYMENTS</p>
          </Link>
          <Link
            to="/candidate/profile"
            className={`flex items-center gap-3 text-primary w-full px-10 py-2 hover:bg-blue-50 ${
              currentPath === "/candidate/profile" && "bg-blue-50"
            }`}
          >
            <IoPersonCircleSharp size={20} />
            <p className="font-semibold">PROFILE</p>
          </Link>
        </div>
      </div>
      {/* BOTTOM */}
      <div>
        <div
          className={`flex items-center gap-3 text-primary w-full px-10 py-2`}
        >
          <img
            src="https://countryflagsapi.netlify.app/flag/LT.svg"
            alt="flag"
            className="w-4.5"
            draggable="false"
          />
          <p className="font-semibold">LANGUAGE</p>
        </div>
        <Link
          className={`flex items-center gap-3 text-primary w-full px-10 py-2`}
        >
          <BsFillQuestionCircleFill size={20} />
          <p className="font-semibold">FAQ</p>
        </Link>
        <div
          className={`flex items-center gap-5 text-primary w-full px-10 py-2`}
        >
          <Link>
            <MdEmail size={24} />
          </Link>
          <Link>
            <IoCall size={20} />
          </Link>
          <Link>
            <FaFacebookSquare size={20} />
          </Link>
        </div>
        <button
          className={`flex items-center gap-3 text-primary w-full px-10 py-2 cursor-pointer hover:bg-blue-50`}
          onClick={handleLogout}
        >
          <IoMdLogOut size={20} />
          <p className="font-semibold">LOG OUT</p>
        </button>
      </div>
    </div>
  );
};

export default CandidateDashSidebar;
