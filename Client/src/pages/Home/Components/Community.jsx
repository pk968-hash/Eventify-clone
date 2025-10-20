import React from "react";
import image from "../../../assets/Employee/employee-h-2.png";
import art1 from "../../../assets/linesArt/blue_2.png";
import art2 from "../../../assets/linesArt/green_1.png";

const Community = () => {
  return (
    <div className="mt-44 flex items-center justify-center gap-2 w-[100%] text-white">
      <div className="relative w-full h-[36rem] rounded-xl overflow-hidden">
        <img src={image} alt="community image" draggable="false"/>
        <h1 className="text-3xl p-6 font-bold absolute bottom-8 z-10 text-white">
          Join the ever-growing community
        </h1>
      </div>
      <div className="w-full h-auto flex flex-col items-center justify-center content-center gap-2">
        <div className="bg-[#20417C] relative w-full h-[17.75rem] rounded-xl overflow-hidden">
          <img src={art1} alt="" className="absolute top-0 left-6" draggable="false"/>
          <div className="absolute bottom-8 p-6 space-y-3">
            <h1 className="text-5xl font-extrabold">400+</h1>
            <h3 className="text-3xl">companies</h3>
          </div>
        </div>
        <div className="bg-[#97CF00] relative w-full h-[17.75rem] rounded-xl overflow-hidden">
          <img src={art2} alt="" className="absolute top-0 left-0"draggable="false" />
          <div className="absolute bottom-8 p-6 space-y-3">
            <h1 className="text-5xl font-extrabold">440 000+</h1>
            <h3 className="text-3xl">shifts worked</h3>
          </div>
        </div>
      </div>
      <div className="bg-[#97CF00] relative w-full h-[18rem] rounded-xl">
        <div className="absolute bottom-8 p-6 space-y-3">
          <h1 className="text-5xl font-extrabold">60+</h1>
          <h3 className="text-3xl">different positions</h3>
        </div>
      </div>
    </div>
  );
};

export default Community;
