import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { MdLogin } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import Popover from "@mui/material/Popover";
import { FaRegCircleCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaGlobeAmericas } from "react-icons/fa";
import { Link, useLocation } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { IoIosArrowBack } from "react-icons/io";

const Navbar = () => {
  const { authUser } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const [step, setStep] = useState("country"); // "country" or "language"
  const [selectedCountry, setSelectedCountry] = useState("LT");
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  const [mobileSiteActive, setMobileSiteActive] = useState(false);
  const [mobileLocationModelOpen, setMobileLocationModelOpen] = useState(false);

  const [lgSidebarActive, setlgSidebarActive] = useState(false);

  const toggleMobileSideMenu = () => {
    setMobileLocationModelOpen(false);
    setMobileSiteActive((prev) => !prev);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setStep("country"); // always open with countries first
  };

  const handleClose = () => {
    setAnchorEl(null);
    setStep("country");
  };

  const countries = [
    {
      code: "LT",
      name: "Lithuania",
      flag: "https://countryflagsapi.netlify.app/flag/LT.svg",
    },
    {
      code: "LV",
      name: "Latvia",
      flag: "https://countryflagsapi.netlify.app/flag/LV.svg",
    },
    {
      code: "EE",
      name: "Estonia",
      flag: "https://countryflagsapi.netlify.app/flag/EE.svg",
    },
  ];

  const Languages = {
    LT: [
      { id: 1, label: "Lietuvių (LT)", code: "LT" },
      { id: 2, label: "English (EN)", code: "EN" },
      { id: 3, label: "Русский (RU)", code: "RU" },
    ],
    LV: [
      { id: 1, label: "Latviešu (LV)", code: "LV" },
      { id: 2, label: "English (EN)", code: "EN" },
      { id: 3, label: "Русский (RU)", code: "RU" },
    ],
    EE: [
      { id: 1, label: "Eesti (RT)", code: "ET" },
      { id: 2, label: "English (EN)", code: "EN" },
      { id: 3, label: "Русский (RU)", code: "RU" },
    ],
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const { pathname } = useLocation();

  return (
    <div>
      {/* BIG SCREEN */}
      <div className="hidden sm:flex items-center justify-between py-6 mx-10 lg:mx-36 border-b border-gray-300">
        {/* LEFT SIDE */}
        <div className="flex items-center justify-center gap-16">
          <div className="flex items-center gap-6">
            <GiHamburgerMenu
              size={24}
              className="cursor-pointer block lg:hidden"
              onClick={() => setlgSidebarActive((prev) => !prev)}
            />
            <Link to="/">
              <img src={logo} alt="logo" className="w-36" draggable="false" />
            </Link>
          </div>
          {pathname !== "/login" && (
            <ul className="hidden lg:flex items-center gap-3 text-sm text-gray-700">
              <Link
                to="/job-offers"
                className="cursor-pointer hover:bg-[#DFE5ED] p-2 rounded-md transition-all duration-150"
              >
                Job Offers
              </Link>
              <Link
                to="/employers"
                className="cursor-pointer hover:bg-[#DFE5ED] p-2 rounded-md transition-all duration-150"
              >
                For Employers
              </Link>
            </ul>
          )}
        </div>

        {/* LG DEVICE SIDEBAR */}

        <ul
          className={`gap-3 rounded-xl py-3 px-5 lg-sidebar${
            lgSidebarActive ? " active" : ""
          }`}
        >
          <Link
            to="/job-offers"
            className="font-bold bg-gray-100 text-gray-600 px-4 py-2 rounded-lg w-full"
          >
            Job Offersss
          </Link>
          <Link
            to="/employers"
            className="font-bold bg-gray-100 text-gray-600 px-4 py-2 rounded-lg w-full"
          >
            For Employers
          </Link>
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">
          {pathname !== "/login" && (
            <Link
              to="/login"
              className="flex items-center justify-center gap-3 bg-primary bg-primary-hover text-white py-2 px-6 rounded-md transition-all duration-150"
            >
              <MdLogin size={23} />
              <span className="font-semibold">
                {authUser ? "Profile" : "Log In"}
              </span>
            </Link>
          )}

          {/* Language Selector */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleClick}
          >
            {/* Dynamic Flag */}
            <img
              src={`https://countryflagsapi.netlify.app/flag/${selectedCountry}.svg`}
              alt="flag"
              className="w-6 rounded-xs"
              draggable="false"
            />
            {/* Dynamic Text */}
            <span className="font-semibold">
              {selectedCountry}-{selectedLanguage}
            </span>
            <IoIosArrowDown size={20} color="gray" fontWeight={800} />
          </div>

          {/* Popover */}
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              className: "rounded-3xl shadow-lg px-6 py-8 w-96",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 font-semibold text-gray-700">
                <FaGlobeAmericas size={20} />
                <span>
                  {step === "country" ? "Location" : "Select Language"}
                </span>
              </div>
              <button onClick={handleClose}>
                <IoClose
                  size={20}
                  className="text-gray-500 hover:text-gray-700"
                />
              </button>
            </div>

            {/* STEP 1: Country List */}
            {step === "country" && (
              <div className="flex flex-col gap-3 px-4">
                {countries.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setSelectedCountry(c.code);
                      setStep("language"); // go to next step
                    }}
                    className={`flex items-center justify-between px-3 py-3 rounded-md transition ${
                      selectedCountry === c.code
                        ? "bg-blue-50 font-semibold text-gray-900"
                        : "bg-gray-100 hover:bg-blue-50 text-gray-700"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        src={c.flag}
                        alt={c.name}
                        className="w-6 rounded-sm"
                        draggable="false"
                      />
                      <span>{c.name}</span>
                    </div>
                    {selectedCountry === c.code && (
                      <FaRegCircleCheck size={18} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* STEP 2: Language List */}
            {step === "language" && (
              <div className="flex flex-col gap-3 px-4">
                {Languages[selectedCountry].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      // changeLanguage(lang.code);
                      handleClose(); // close after selection
                    }}
                    className={`flex items-center justify-between px-3 py-3 rounded-md transition ${
                      selectedLanguage === lang.code
                        ? "bg-blue-50 font-semibold text-gray-900"
                        : "bg-gray-100 hover:bg-blue-50 text-gray-700"
                    }`}
                  >
                    <span>{lang.label}</span>
                    {selectedLanguage === lang.code && (
                      <FaRegCircleCheck size={18} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </Popover>
        </div>
      </div>
      {/* MOBILE SCREEN */}
      <div className="block sm:hidden py-3 px-4">
        <div className="flex items-center justify-between">
          <GiHamburgerMenu
            size={24}
            className="cursor-pointer"
            onClick={toggleMobileSideMenu}
          />
          <div>
            <img src={logo} alt="logo" className="w-36" draggable="false" />
          </div>
          <Link
            to="/login"
            className="flex items-center gap-2 bg-primary text-white rounded-md py-2 px-8 cursor-pointer"
          >
            <MdLogin size={20} />
            <span className="font-semibold">
              {authUser ? "Profile" : "Log In"}
            </span>
          </Link>
        </div>
        {/* SIDEBAR */}
        <div
          className={` px-6 py-4 mobile-sidebar${
            mobileSiteActive ? " active" : ""
          }`}
          id="mobileSidebar"
        >
          {/* TOP */}
          <div className="flex items-center justify-between">
            <img src={logo} alt="logo" className="w-36" draggable="false"/>
            <FaArrowLeft
              size={22}
              className="cursor-pointer"
              onClick={() => toggleMobileSideMenu()}
            />
          </div>
          <ul className="flex flex-col gap-2 mt-6 font-semibold">
            <Link
              to="/job-offers"
              onClick={toggleMobileSideMenu}
              className="p-4 bg-gray-100 text-gray-600 rounded-md"
            >
              Job Offers
            </Link>
            <Link
              to="/employers"
              onClick={toggleMobileSideMenu}
              className="p-4 bg-gray-100 text-gray-600 rounded-md"
            >
              For Employers
            </Link>
          </ul>
          <hr className="my-8 text-gray-300" />

          {/* LANGUAGE */}
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <img
                src={`https://countryflagsapi.netlify.app/flag/${selectedCountry}.svg`}
                alt="flag"
                className="w-7"
                draggable="false"
              />
              <span className="font-semibold">
                {selectedCountry}-{selectedLanguage}
              </span>
            </div>
            {mobileLocationModelOpen ? (
              <IoIosArrowDown
                size={22}
                onClick={() => setMobileLocationModelOpen(false)}
              />
            ) : (
              <IoIosArrowBack
                size={22}
                onClick={() => setMobileLocationModelOpen(true)}
              />
            )}
          </div>
          {mobileLocationModelOpen && (
            <div className="mt-8">
              {/* STEP 1: Country List */}
              {step === "country" && (
                <div className="flex flex-col gap-3">
                  {countries.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => {
                        setSelectedCountry(c.code);
                        setStep("language"); // go to next step
                      }}
                      className={`flex items-center justify-between p-4 rounded-md transition ${
                        selectedCountry === c.code
                          ? "bg-blue-50 font-semibold text-gray-900"
                          : "bg-gray-100 hover:bg-blue-50 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src={c.flag}
                          alt={c.name}
                          className="w-6 rounded-sm"
                          draggable="false"
                        />
                        <span>{c.name}</span>
                      </div>
                      {selectedCountry === c.code && (
                        <FaRegCircleCheck size={18} className="text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* STEP 2: Language List */}
              {step === "language" && (
                <div className="flex flex-col gap-3">
                  {Languages[selectedCountry].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setSelectedLanguage(lang.code);
                        handleClose(); // close after selection
                        setMobileLocationModelOpen(false);
                      }}
                      className={`flex items-center justify-between p-4 rounded-md transition ${
                        selectedLanguage === lang.code
                          ? "bg-blue-50 font-semibold text-gray-900"
                          : "bg-gray-100 hover:bg-blue-50 text-gray-700"
                      }`}
                    >
                      <span>{lang.label}</span>
                      {selectedLanguage === lang.code && (
                        <FaRegCircleCheck size={18} className="text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// const changeLanguage = (langCode) => {
//   const select = document.querySelector(".goog-te-combo");
//   if (select) {
//     select.value = langCode;
//     select.dispatchEvent(new Event("change"));
//   }
// };
