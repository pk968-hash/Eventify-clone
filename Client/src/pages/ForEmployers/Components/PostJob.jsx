import React from "react";
import image from "../../../assets/EmployerSection/employer-9.png";

const PostJob = () => {
  const data = [
    {
      id: 1,
      title: "Post a job ad for vacant shifts",
      description:
        "Post the ad on the Workis platform and specify the nature of the job and the hourly wage. It will take up to 10 minutes.",
    },
    {
      id: 2,
      title: "Choose the candidates",
      description:
        "Choose the right employees for your needs by reviewing candidate experiences and ratings.",
    },
    {
      id: 3,
      title: "Wait for their arrival",
      description:
        "The worker is employed by Workis. Leave the hassle of administration in the past.",
    },
    {
      id: 4,
      title: "Confirm hours worked and evaluate the employee",
      description:
        "After the employee has completed the work, confirm the hours worked and rate the employee from 1 to 5 stars.",
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

export default PostJob;
