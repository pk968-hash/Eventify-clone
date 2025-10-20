import React from "react";

const FAQ = () => {
  const data = [
    {
      title: "What do I need to get a job?",
      description:
        "electronic signature (for example, Smart ID); medical certificate; pass introductory and work safety tests (you can find them on the Workis platform); some positions require a food hygiene certificate.",
    },
    {
      title: "How does the Workis platform work?",
      description:
        "Once you've uploaded the required documents and completed your profile, you can apply for jobs on the Workis platform - without having to go anywhere! If your application is accepted, you will receive an SMS notifying you of this and an email where you will be asked to sign a remote employment contract. Once you have signed the contract, all you have to do is show up for work.",
    },
    {
      title: "How to get a job faster?",
      description:
        "don't forget to complete your profile and upload all the necessary documents; apply for several jobs on the same day to increase your chances of getting a job; pay attention to jobs with less competition (they are marked in green); ask to be evaluated on the platform - this will help you get other jobs in the future.",
    },
    {
      title: "When and what salary will I receive?",
      description:
        "Next to each job ad you will see the hourly Gross salary. The pay you receive will depend on hours worked, taxes paid, additional pension accruals and the application of non-taxable income. The salary will be transferred to your bank account within 3-10 working days after the termination of the employment contract.",
    },
    {
      title: "Can I work if I am a citizen of another country?",
      description:
        "We can employ EU and EFTA citizens and citizens of third countries who have a permanent residence permit in Lithuania or EU resident cards. A temporary residence permit in Lithuania is sufficient for Ukrainians.",
    },
    {
      title:
        "Can I work if I am registered with the Public Employment Service?",
      description:
        "Yes! Fixed-term employment contracts (for a few days or weeks) are concluded on the Workis platform, so you will not lose your unemployed status. The unemployment benefit will be suspended only for the period for which the employment contract is concluded.",
    },
  ];
  return (
    <div className="mt-24 px-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-start gap-20 w-full border-b border-gray-300 py-6"
        >
          <h1 className="text-xl font-extrabold w-[30%]">{item.title}</h1>
          <p className="w-[70%]">{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
