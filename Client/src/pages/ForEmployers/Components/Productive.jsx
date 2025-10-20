import React from "react";
import img_1 from "../../../assets/EmployerSection/employer-6.png";
import img_2 from "../../../assets/EmployerSection/employer-7.png";
import img_3 from "../../../assets/EmployerSection/employer-8.png";

const Productive = () => {
  const data = [
    {
      title: "Increase competitiveness",
      description:
        "The ability to quickly respond to market needs will help you work more efficiently than your competitors.",
      image: img_1,
    },
    {
      title: "Manage the risks",
      description:
        "A timely response to increased staffing needs will help avoid losses.",
      image: img_2,
    },
    {
      title: "Save resources",
      description:
        "Hiring temporary staff will reduce financial costs and take the burden off internal HR specialists.",
      image: img_3,
    },
  ];
  return (
    <div className="mt-40 space-y-2">
      <div className="bg-white rounded-2xl p-8 flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold">Maintain productivity</h1>
          <p>
            Finding the right employees quickly will ensure that work gets done
            on time.
          </p>
        </div>
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
            <div className="relative z-10 mt-auto p-6 text-white flex flex-col justify-end h-52">
              <h3 className="text-3xl font-extrabold">{item.title}</h3>
              <p className="mt-4 leading-tight">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Productive;
