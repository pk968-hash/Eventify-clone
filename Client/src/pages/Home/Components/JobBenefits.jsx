import React from "react";
import img_1 from "../../../assets/Employee/employee-1.png";
import img_2 from "../../../assets/Employee/employee-2.png";
import img_3 from "../../../assets/Employee/employee-3.png";

const JobBenefits = () => {
  const benefits = [
    {
      title: "Work that adapts to your schedule",
      description:
        "When, where and what you want to do is up to you. Choose from a variety of jobs and find your favourite.",
      image: img_1,
    },
    {
      title: "Get paid the next week",
      description:
        "Don't wait until next month to get paid. Get a job through Workis and get paid the next week.",
      image: img_2,
    },
    {
      title: "The easiest way to get a job",
      description:
        "Find the right job without leaving your home. No job interviews.",
      image: img_3,
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-24 mb-20 mx-2">
      {benefits.map((item, index) => (
        <div
          key={index}
          className="relative h-150 rounded-2xl overflow-hidden shadow-lg bg-cover bg-center flex"
          style={{
            backgroundImage: `url(${item.image})`,
          }}
        >
          {/* Text container */}
          <div className="relative z-10 mt-auto mb-14 p-6 text-white flex flex-col justify-start h-40">
            <h3 className="text-3xl font-extrabold">{item.title}</h3>
            <p className="mt-4 text-sm">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobBenefits;
