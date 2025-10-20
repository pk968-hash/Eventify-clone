import { useState } from "react";
import hero from "../../../assets/hero-img.png";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router";
import { MdOutlineCalendarToday } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { Typewriter } from "react-simple-typewriter";
import { Popover } from "@mui/material";

const JobSearch = () => {
  const [cityAnchor, setCityAnchor] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const locations = [
    { label: "New York" },
    { label: "London" },
    { label: "Tokyo" },
    { label: "Paris" },
    { label: "Sydney" },
  ];

  const openCityPopover = (event) => {
    setCityAnchor(event.currentTarget);
  };

  const closeCityPopover = () => {
    setCityAnchor(null);
  };

  const cityOpen = Boolean(cityAnchor);

  return (
    <div className="">
      {/* TOP */}
      <div className="flex justify-between items-end mt-12">
        {/* Text */}
        <h1
          className="flex flex-col justify-end rounded-tl-2xl bg-gradient-to-tr from-[#F1F3F7] to-[#FFFFFF] font-bold text-6xl space-y-4 px-16 py-16 w-full"
          style={{
            boxShadow: "-3px -3px 16px rgba(0,0,0,0.25)", // red-500
          }}
        >
          <span className="text-gradient">Adapts to my</span>
          <span className="text-gradient">
            <Typewriter
              words={["schedule", "hobbies", "wishes"]}
              loop={0} // infinite
              cursor
              cursorStyle="|"
              cursorClassName="text-[#000000]"
              typeSpeed={150}
              deleteSpeed={100}
              delaySpeed={1000}
            />
          </span>
        </h1>

        {/* Image */}
        <div className="flex items-end">
          <img src={hero} alt="hero-img" className="w-134 object-contain" draggable="false"/>
        </div>
      </div>

      {/* BOTTOM - SEARCH  */}
      <div
        className="flex items-center gap-5 bg-white p-8 rounded-b-xl"
        style={{ boxShadow: "0px 3px 16px rgba(0,0,0,0.25)" }}
      >
        {/* LOCATION SELECT */}
        <div
          onClick={openCityPopover}
          className="flex items-center justify-start gap-2 border border-[#144387] w-full px-3 py-4 rounded-xl text-gray-600 font-semibold cursor-pointer"
        >
          <IoLocationOutline size={20} />
          <span>{selectedCity ? selectedCity.label : "Enter City"}</span>
        </div>
        {/* CITY SELECT */}
        <Popover
          open={cityOpen}
          anchorEl={cityAnchor}
          onClose={closeCityPopover}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          PaperProps={{ className: "rounded-xl shadow-lg p-4 w-64" }}
        >
          <div className="flex flex-col gap-2">
            {locations.map((loc) => (
              <button
                key={loc.label}
                onClick={() => {
                  setSelectedCity(loc);
                  closeCityPopover();
                }}
                className={`px-3 py-2 rounded-md text-left transition ${
                  selectedCity?.label === loc.label
                    ? "bg-blue-50 font-semibold text-gray-900"
                    : "hover:bg-blue-50 text-gray-700"
                }`}
              >
                {loc.label}
              </button>
            ))}
          </div>
        </Popover>

        {/* DATE SELECT */}
        <div className="flex items-center justify-start gap-2 border border-[#144387] w-full px-3 py-4 rounded-xl text-gray-600 font-semibold cursor-pointer">
          <MdOutlineCalendarToday size={18} />
          <input type="date" name="" id="" className="w-full outline-none" />
        </div>

        {/* SEARCH BUTTON */}
        <Link className="flex items-center justify-center gap-3 w-full bg-primary bg-primary-hover text-white px-3 py-4 rounded-xl font-semibold cursor-pointer transition-all duration-150">
          <IoSearch size={20} />
          <span>Offers (983)</span>
        </Link>
      </div>
    </div>
  );
};

export default JobSearch;
