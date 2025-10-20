import React from "react";
import image from "../../../assets/Employee/employee-h-3.png";

const GetJob = () => {
  const data = [
    {
      id: 1,
      title: "Sign up",
      description:
        "Once you've signed up, don't forget to complete all the steps you need to take to get a job: complete your profile, pass the trainings and upload the necessary documents.",
    },
    {
      id: 2,
      title: "Apply for a job",
      description:
        "After finding a job (or several) you like, apply for it directly on the Workis platform and wait for the application to be approved.",
    },
    {
      id: 3,
      title: "Come to work",
      description:
        "After approval, you will receive all the information you need by email. You will then need to arrive at the workplace at the time specified.",
    },
    {
      id: 4,
      title: "Get paid",
      description:
        "We will transfer the salary to your personal bank account within a week. Time to find another shift!",
    },
  ];
  return (
    <div className="mt-40 w-full grid grid-cols-3 gap-2">
      {/* left side */}
      <div className="col-span-2 flex flex-col gap-2 div1">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white flex items-center gap-6 rounded-2xl p-6"
          >
            <h1 className="text-3xl font-extrabold px-4">{item.id}</h1>
            <div className="w-[1px] h-full bg-gray-300"></div>
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold">{item.title}</h1>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* right side */}
      <div className="div2">
        <img
          src={image}
          alt="image"
          className="w-full h-full object-cover rounded-2xl"
          draggable="false"
        />
      </div>
    </div>
  );
};

export default GetJob;
