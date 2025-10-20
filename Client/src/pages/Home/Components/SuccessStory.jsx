import React from "react";

const SuccessStory = () => {
  const data = [
    {
      title: "Eligijus",
      description:
        "When I started my studies, I was looking for the best and most convenient way to earn money. The possibility to choose from different shifts allows me to easily combine work with my class schedule. Workis is a great place for a student not only to work and earn, but also to try out different positions.",
    },
    {
      title: "Rūta",
      description:
        "I'm a freelancer, so I choose Workis to find additional jobs because I can plan my free time around the hours of the jobs. I'm happy with the flexibility, convenience and variety of jobs offered on Workis, so I've been with Workis for 5 years.",
    },
    {
      title: "Saulius",
      description:
        "Even though I have a regular job, I chose to work additionally through Workis because of the variety of jobs it offers. Workis is convenient for me for many reasons - I can choose when I want to work and apply for different positions and companies. I highly recommend it.",
    },
  ];
  return (
    <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-2">
      {data.map((item, index) => (
        <div
          key={index}
          className="p-8 bg-white rounded-xl text-center space-y-4"
        >
          <h1 className="text-xl font-bold">{item.title}</h1>
          <p className="">"{item.description}"</p>
        </div>
      ))}
    </div>
  );
};

export default SuccessStory;
