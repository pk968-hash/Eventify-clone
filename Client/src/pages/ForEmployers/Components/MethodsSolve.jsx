import React from "react";
import art1 from "../../../assets/linesArt/blue_6.png";
import art2 from "../../../assets/linesArt/green_2.png";
import art3 from "../../../assets/linesArt/blue_4.png";
import art4 from "../../../assets/linesArt/blue_7.png";
import art5 from "../../../assets/linesArt/green_3.png";
import art6 from "../../../assets/linesArt/blue_5.png";
const MethodsSolve = () => {
  return (
    <div className="mt-52 mb-20">
      {/* Block 1 */}
      <div>
        <h1 className="text-3xl font-extrabold px-4">
          HR challenges are holding back the company's progress
        </h1>
        <div className="flex items-center gap-2 mt-12">
          <div className="bg-[#20417C] w-full h-[15rem] rounded-xl relative overflow-hidden">
            <img src={art1} alt="" className="absolute left-0 top-0" draggable="false"/>
            <h1 className="absolute z-10 text-white text-2xl font-extrabold py-10 px-6">
              Rapidly changing business needs make effective resource planning
              impossible.
            </h1>
          </div>
          <div className="bg-[#97CF00] w-full h-[15rem] rounded-xl relative overflow-hidden">
            <img src={art2} alt="" className="absolute top-0 right-0" draggable="false"/>
            <h1 className="absolute z-10 text-white text-2xl font-extrabold py-10 px-6">
              It is difficult to attract and retain employees.
            </h1>
          </div>
          <div className="bg-[#20417C] w-full h-[15rem] rounded-xl relative overflow-hidden">
            <img src={art3} alt="" className="absolute top-0 -left-0" draggable="false"/>
            <h1 className="absolute z-10 text-white text-2xl font-extrabold py-10 px-6">
              HR specialists are no longer able to respond in time to changing
              business needs.
            </h1>
          </div>
        </div>
      </div>
      {/* Block 2 */}
      <div>
        <h1 className="text-3xl font-extrabold px-4 mt-16">
          Traditional methods will not solve them
        </h1>
        <div className="flex items-center gap-2 mt-12">
          <div className="bg-[#20417C] w-full h-[15rem] rounded-xl relative overflow-hidden">
            <img src={art4} alt="" className="absolute left-0 top-0" draggable="false" />
            <h1 className="absolute z-10 text-white text-2xl font-extrabold py-10 px-6">
              Better planning of working hours will not help to fill vacancies
              more efficiently.
            </h1>
          </div>
          <div className="bg-[#97CF00] w-full h-[15rem] rounded-xl relative overflow-hidden">
            <img src={art5} alt="" className="absolute top-0 right-0" draggable="false"/>
            <h1 className="absolute z-10 text-white text-2xl font-extrabold py-10 px-6">
              A more modern employer branding will not help to find the right
              employees or reduce turnover.
            </h1>
          </div>
          <div className="bg-[#20417C] w-full h-[15rem] rounded-xl relative overflow-hidden">
            <img src={art6} alt="" className="absolute top-0 -left-0" draggable="false"/>
            <h1 className="absolute z-10 text-white text-2xl font-extrabold py-10 px-6">
              Faster recruitment processes will not reduce recruitment time to
              24 hours.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodsSolve;
