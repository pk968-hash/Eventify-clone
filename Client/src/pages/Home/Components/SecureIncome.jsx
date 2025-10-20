import React from "react";
import { Link } from "react-router";
import { IoSearch } from "react-icons/io5";
import blue_1 from "../../../assets/linesArt/blue_1.png";
import image from "../../../assets/Employee/employee-h-1.png";

const SecureIncome = () => {
  return (
    <div className="mt-60">
      {/* TOP */}
      <div className="bg-white rounded-lg p-8 flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold">
            Haven't found a permanent job yet?
          </h1>
          <p>
            With Workis, you can earn money without the commitment of a
            long-term job.
          </p>
        </div>
        <Link className="flex items-center justify-center gap-2 bg-primary bg-primary-hover text-white w-full max-w-[18rem] py-4 rounded-xl font-semibold transition-all duration-150">
          <IoSearch size={20} />
          <span>Find a Job</span>
        </Link>
      </div>
      {/* BOTTOM */}
      <div className="w-[100%] my-3 flex items-center gap-2">
        {/* LEFT */}
        <div className="bg-[#20417C] w-[35%] h-[28rem] rounded-xl relative">
          <img src={blue_1} alt="" className="absolute top-0 left-0"draggable="false" />
          <div className="text-white p-6 space-y-4 absolute bottom-0">
            <h1 className="text-3xl font-bold">
              Need to get paid <i>here</i> and <i>now</i> ?
            </h1>
            <p>
              You can perfectly combine short-term jobs with other work or
              activities.
            </p>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-3/4 h-[28rem] rounded-xl relative overflow-hidden">
          <img src={image} alt="" className="w-full" draggable="false"/>
          <div className="absolute bottom-0 text-white p-6 space-y-4">
            <h1 className="text-3xl font-bold w-full max-w-64">
              Have some time after lectures?
            </h1>
            <p className="w-full max-w-76">
              Choose a job that fits your schedule and pad your wallet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureIncome;
