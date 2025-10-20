import logo from "../../../assets/logo.png";
import { FaRegCheckCircle } from "react-icons/fa";
import { Link } from "react-router";

const steps = [
  { key: "Details", title: "Additional Details", desc: "Provide details" },
  { key: "Password", title: "Password", desc: "Create your password" },
];

const EmployerOnboardingSidebar = ({ step }) => {
  const currentStepIndex = steps.findIndex((s) => s.key === step);

  return (
    <div className="w-full min-h-screen bg-[#F2F5F8] select-none flex flex-col justify-between">
      {/* Logo */}
      <div className="w-full">
        <div className="border-b border-gray-300 h-24 flex items-center mx-3">
          <img src={logo} alt="logo" className="w-36" draggable="false" />
        </div>

        {/* Steps */}
        {steps.map((s, index) => {
          const isCompleted = index < currentStepIndex; // completed = before current
          const isCurrent = index === currentStepIndex;

          return (
            <div key={s.key} className="flex items-center gap-2 px-10 mt-6">
              {/* Circle + Icon */}
              <div
                className={`border p-2 ${isCompleted
                  ? "bg-[#F4F9EE] border-[#83d13a5e]" // completed
                  : "border-gray-200" // current & upcoming
                  }`}
              >
                <FaRegCheckCircle
                  size={20}
                  className={isCompleted ? "text-[#8DC658]" : "text-gray-400"}
                />
              </div>

              {/* Text */}
              <div>
                <h3
                  className={`text-[15px] ${isCurrent ? "font-medium text-black" : "font-normal"
                    }`}
                >
                  {s.title}
                </h3>
                <p
                  className={`text-[14px] ${isCurrent ? "font-medium text-gray-700" : "text-gray-500"
                    }`}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {/* <div className="text-center flex items-center justify-center py-6 border-t border-gray-300">
        <p className="text-gray-500">
          Already have an Account?{" "}
          <Link className="text-blue-900 underline" to="/login">
            Log in!
          </Link>
        </p>
      </div> */}
    </div>
  );
};

export default EmployerOnboardingSidebar;
