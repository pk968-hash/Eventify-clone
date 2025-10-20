import React from "react";
import image1 from "../../../assets/EmployerSection/employer-2.png";
import art1 from "../../../assets/linesArt/blue_2.png";
import art2 from "../../../assets/linesArt/green_1.png";
import image2 from "../../../assets/EmployerSection/employer-3.png";
import image3 from "../../../assets/EmployerSection/employer-4.png";
import image4 from "../../../assets/EmployerSection/employer-5.png";

const Problems = () => {
  return (
    <>
      <div className="mt-44 flex items-center justify-center gap-2 w-[100%] text-white">
        <div className="relative w-full h-[36rem] rounded-xl overflow-hidden text-white">
          <img src={image1} alt="community image" draggable="false" />
          <div className="absolute bottom-0 p-6 space-y-3">
            <h1 className="text-3xl font-extrabold">
              Do you need employees <i>tomorrow</i>?
            </h1>
            <h3 className="">
              Orders suddenly increased, the project grew, and there are no
              extra hands? No need to worry - Workis temporary employees can
              start working tomorrow.
            </h3>
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
              <h1 className="text-3xl font-extrabold">
                Ensure business stability
              </h1>
            </div>
          </div>
          <div className="bg-[#97CF00] relative w-full h-[17.75rem] rounded-xl overflow-hidden">
            <img
              src={art2}
              alt=""
              className="absolute top-0 -left-4"
              draggable="false"
            />
            <div className="absolute bottom-0 p-6 space-y-3">
              <h1 className="text-3xl font-extrabold">
                Ensure business stability
              </h1>
              <h3 className="">
                Short-term workers will help keep the balance and ensure that
                work is completed on time.
              </h3>
            </div>
          </div>
        </div>
        <div className="relative w-full h-[36rem] rounded-xl overflow-hidden text-white">
          <img src={image2} alt="community image" draggable="false" />
          <div className="absolute bottom-0 p-6 space-y-3">
            <h1 className="text-3xl font-extrabold">
              Is it the height of the season again?
            </h1>
            <h3 className="">
              New season brings the same old challenges? Workis will help you
              deal with the latter.
            </h3>
          </div>
        </div>
      </div>
      {/* Problem block 2 */}
      <div className="mt-44 flex items-center justify-center gap-2 w-[100%] text-white">
        <div className="w-full h-auto flex flex-col items-center justify-center content-center gap-2">
          <div className="bg-[#20417C] relative w-full h-[17.75rem] rounded-xl overflow-hidden">
            <div className="absolute bottom-0 p-6 space-y-3">
              <h1 className="text-3xl font-extrabold">Why Workis?</h1>
            </div>
          </div>
          <div className="bg-[#97CF00] relative w-full h-[17.75rem] rounded-xl overflow-hidden">
            <div className="absolute bottom-0 p-6 space-y-3">
              <h1 className="text-3xl font-extrabold">
                Enjoy the shortest recruitment process
              </h1>
              <h3 className="">
                87% of job ads posted on Workis are filled within a day. Select
                your employees today and wait for them to arrive tomorrow.
              </h3>
            </div>
          </div>
        </div>
        <div className="relative w-full h-[36rem] rounded-xl overflow-hidden text-white">
          <img src={image3} alt="community image" draggable="false" />
          <div className="absolute bottom-0 p-6 space-y-3">
            <h1 className="text-3xl font-extrabold">
              Find the right employees
            </h1>
            <h3 className="">
              Make data-driven HR decisions. Before you select candidates,
              you'll see their actual experience and ratings from other clients.
            </h3>
          </div>
        </div>

        <div className="relative w-full h-[36rem] rounded-xl overflow-hidden text-white">
          <img src={image4} alt="community image" draggable="false"/>
          <div className="absolute bottom-0 p-6 space-y-3">
            <h1 className="text-3xl font-extrabold">
              Don't waste time on administration
            </h1>
            <h3 className="">
              Save your precious time. Workis will take care of employee
              recruitment, contract termination and other administrative
              processes.
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Problems;
