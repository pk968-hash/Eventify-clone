import React from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router";
import img_1 from "../../../assets/Employee/employee-4.png";
import img_2 from "../../../assets/Employee/employee-5.png";
import img_3 from "../../../assets/Employee/employee-6.png";

const Positions = () => {
  const data = [
    {
      title: "Retail",
      description: "Shop assistants, cashiers, sellers-consultants",
      image: img_1,
    },
    {
      title: "Logistics",
      description: "Parcel sorters, loaders, warehouse workers",
      image: img_2,
    },
    {
      title: "Manufacturing",
      description: "Sticker gluers, packers, auxiliary workers",
      image: img_3,
    },
  ];
  return (
    <div className="mt-56 space-y-2">
      <div className="bg-white rounded-2xl p-8 flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold">
            Choose from different positions
          </h1>
          <p>Try different roles or sectors and gain new skills</p>
        </div>
        <Link className="flex items-center justify-center gap-2 bg-primary bg-primary-hover text-white w-full max-w-[18rem] py-4 rounded-xl font-semibold transition-all duration-150">
          <IoSearch size={20} />
          <span>Find a Job</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative h-110 rounded-2xl overflow-hidden shadow-lg bg-cover bg-center flex"
            style={{
              backgroundImage: `url(${item.image})`,
            }}
          >
            {/* Text container */}
            <div className="relative z-10 mt-auto p-6 text-white flex flex-col justify-start h-40">
              <h3 className="text-3xl font-extrabold">{item.title}</h3>
              <p className="mt-4">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Positions;
