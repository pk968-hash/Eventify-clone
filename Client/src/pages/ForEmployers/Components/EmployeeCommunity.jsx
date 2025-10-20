import React from "react";
import image from "../../../assets/EmployerSection/employee-1.png";
import art1 from "../../../assets/linesArt/blue_1.png";
import art2 from "../../../assets/linesArt/blue_2.png";

const EmployeeCommunity = () => {
  return (
    <div className="mt-26 flex items-center justify-center gap-2 w-[100%] text-white">
      <div className="w-full h-auto flex flex-col items-center justify-center content-center gap-2">
        <div className="bg-[#97CF00] relative w-full h-[17.75rem] rounded-xl overflow-hidden">
          <div className="absolute bottom-8 p-6 space-y-3">
            <h1 className="text-5xl font-extrabold">60+</h1>
            <h3 className="text-3xl">different positions</h3>
          </div>
        </div>
        <div className="bg-[#20417C] relative w-full h-[17.75rem] rounded-xl overflow-hidden">
          <img
            src={art2}
            alt=""
            className="absolute top-0 left-0"
            draggable="false"
          />
          <div className="absolute bottom-8 p-6 space-y-3">
            <h1 className="text-5xl font-extrabold">~7</h1>
            <h3 className="text-3xl">candidates to a shift</h3>
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col items-center justify-center content-center gap-2">
        <div className="bg-[#20417C] relative w-full h-[17.75rem] rounded-xl overflow-hidden">
          <img
            src={art1}
            alt=""
            className="absolute top-0 left-0"
            draggable="false"
          />
          <div className="absolute bottom-0 p-6 space-y-3">
            <h1 className="text-5xl font-extrabold">4.48/5</h1>
            <h3 className="text-3xl">average employee rating</h3>
          </div>
        </div>
        <div className="bg-[#97CF00] relative w-full h-[17.75rem] rounded-xl overflow-hidden">
          <div className="absolute bottom-8 p-6 space-y-3">
            <h1 className="text-5xl font-extrabold">98 %</h1>
            <h3 className="text-3xl">attendance</h3>
          </div>
        </div>
      </div>
      <div className="relative w-full h-[36rem] rounded-xl overflow-hidden text-white">
        <img src={image} alt="community image" draggable="false" />
        <div className="absolute bottom-8 p-6 space-y-3">
          <h1 className="text-5xl font-extrabold">440 000+</h1>
          <h3 className="text-3xl">worked shifts</h3>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCommunity;
