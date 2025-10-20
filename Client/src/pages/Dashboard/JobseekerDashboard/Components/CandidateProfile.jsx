import { useAuth } from "../../../../context/AuthContext";
import { Link } from "react-router";
import { IoIosArrowForward } from "react-icons/io";
import { PiIdentificationCard } from "react-icons/pi";
import { RiFileCheckLine } from "react-icons/ri";
import { CiBank } from "react-icons/ci";
import { LuWatch } from "react-icons/lu";
import { LiaMedalSolid, LiaRunningSolid } from "react-icons/lia";
import { CiStar } from "react-icons/ci";
import { IoAlertCircleOutline } from "react-icons/io5";

const CandidateProfile = () => {
  const { authUser } = useAuth();

  const statistics = [
    {
      icon: <LuWatch size={20} className="text-gray-500" />,
      number: 4,
      title: "Shifts worked",
      alertIcon: <IoAlertCircleOutline className="text-gray-500" size={24} />,
      alertText: "hello",
    },
    {
      icon: <LiaRunningSolid size={20} className="text-gray-500" />,
      number: 0,
      title: "Missed shifts",
      alertIcon: <IoAlertCircleOutline className="text-gray-500" size={24} />,
      alertText: "hello",
    },
    {
      icon: <CiStar size={20} className="text-gray-500" />,
      number: 0.0,
      title: "Your rating",
      alertIcon: <IoAlertCircleOutline className="text-gray-500" size={24} />,
      alertText: "hello",
    },
  ];

  return (
    <div className="flex flex-col items-center mx-auto w-full max-w-xl mt-10">
      {/* Profile Name and Setting */}
      <div className="w-full bg-white flex items-center justify-between py-4 px-6 rounded-xl">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-normal p-3 rounded-full text-white bg-red-400">
            {authUser.firstName[0]}
            {authUser.lastName[0]}
          </h1>
          <p className="text-primary font-bold flex flex-col leading-tight">
            <span> {authUser.firstName} </span>
            <span> {authUser.lastName}</span>
          </p>
        </div>
        <Link className="text-primary flex items-center gap-2">
          <span className="font-bold">Edit</span>
          <IoIosArrowForward size={20} className="text-gray-500" />
        </Link>
      </div>
      {/* Confirm Email section */}
      <div className="w-full bg-white flex items-center justify-between py-4 px-6 rounded-xl mt-6">
        <div className="flex items-center gap-2">
          <PiIdentificationCard size={28} className="text-gray-500" />
          <div>
            <h1 className="text-primary font-semibold">Confirm your email</h1>
            <p className="text-[11px] text-gray-500 font-medium">
              Necessary for successful employment
            </p>
          </div>
        </div>
        <button className="px-16 text-center py-2 rounded-md font-normal text-white bg-green-600 hover:bg-green-700 cursor-pointer transition-all duration-150">
          Continue
        </button>
      </div>

      {/* Links */}
      <div className="w-full rounded-xl mt-6 bg-white px-6">
        <Link className="w-full flex items-center justify-start py-5 gap-4 border-b-2 border-gray-200">
          <div className="p-2 bg-red-100 rounded-sm">
            <PiIdentificationCard size={24} className="text-red-400" />
          </div>
          <div>
            <h1 className="text-primary font-semibold">
              Your personal details
            </h1>
            <p className="text-[11px] text-gray-500 font-medium">Fill in</p>
          </div>
        </Link>

        <Link className="w-full flex items-center justify-start py-5 gap-4 border-b-2 border-gray-200">
          <div className="p-2 bg-red-100 rounded-sm">
            <RiFileCheckLine size={24} className="text-red-400" />
          </div>
          <div>
            <h1 className="text-primary font-semibold">
              Documents and certificates
            </h1>
            <p className="text-[11px] text-gray-500 font-medium">Upload</p>
          </div>
        </Link>
        <Link className="w-full flex items-center justify-start py-5 gap-4 border-b-2 border-gray-200">
          <div className="p-2 bg-red-100 rounded-sm">
            <LiaMedalSolid size={24} className="text-red-400" />
          </div>
          <div>
            <h1 className="text-primary font-semibold">Trainings</h1>
            <p className="text-[11px] text-gray-500 font-medium">
              Takes about 45 mins to complete
            </p>
          </div>
        </Link>
        <Link className="w-full flex items-center justify-start py-5 gap-4 border-b-2 border-gray-200">
          <div className="p-2 bg-red-100 rounded-sm">
            <CiBank size={24} className="text-red-400" />
          </div>
          <div>
            <h1 className="text-primary font-semibold">Bank Information</h1>
            <p className="text-[11px] text-gray-500 font-medium">
              Specify where to pay
            </p>
          </div>
        </Link>
        <Link className="w-full flex items-center justify-start py-5 gap-4 border-b-2 border-gray-200">
          <div className="p-2 bg-red-100 rounded-sm">
            <CiBank size={24} className="text-red-400" />
          </div>
          <div>
            <h1 className="text-primary font-semibold">
              Work and volunteering experience
            </h1>
            <p className="text-[11px] text-gray-500 font-medium">
              Fill in and stand out from the crowd!
            </p>
          </div>
        </Link>
      </div>

      <div className="w-full rounded-xl mt-6 bg-white py-5 flex items-start justify-between">
        {/* {
          statistics.map((item) => (
            <div className="flex items-center justify-start border-r-2 border-gray-200 px-6 gap-2">
              <div className="flex flex-col items-start justify-between">
                <div className="flex items-center gap-1">
                  {item.icon}<span className="text-xl font-bold">{item.number}</span>
                </div>
                <div className="text-gray-500 text-sm font-medium">{item.title}</div>
              </div>
              <div className="p-2 rounded-sm bg-gray-100 cursor-pointer">
                {item.alertIcon}
              </div>
            </div>
          ))
        } */}

        <div className="flex items-center justify-start gap-6 border-r-2 border-gray-200 px-4">
          <div className="flex flex-col items-start justify-between">
            <div className="flex items-center gap-1">
              <LuWatch size={20} className="text-gray-500" />
              <span className="text-xl font-bold">4</span>
            </div>
            <div className="text-gray-500 text-sm font-medium">
              Shifts worked
            </div>
          </div>
          <div className="p-2 rounded-sm bg-gray-200 cursor-pointer">
            <IoAlertCircleOutline className="text-gray-500" size={24} />
          </div>
        </div>
        <div className="flex items-center justify-start gap-6 border-r-2 border-gray-200 px-4">
          <div className="flex flex-col items-start justify-between">
            <div className="flex items-center gap-1">
              <LiaRunningSolid size={20} className="text-gray-500" />
              <span className="text-xl font-bold">0</span>
            </div>
            <div className="text-gray-500 text-sm font-medium">
              Missed shifts
            </div>
          </div>
          <div className="p-2 rounded-sm bg-gray-200 cursor-pointer">
            <IoAlertCircleOutline className="text-gray-500" size={24} />
          </div>
        </div>
        <div className="flex items-center justify-start gap-6 px-4">
          <div className="flex flex-col items-start justify-between">
            <div className="flex items-center gap-1">
              <CiStar size={20} className="text-gray-500" />
              <span className="text-xl font-bold">0.0</span>
            </div>
            <div className="text-gray-500 text-sm font-medium">Your rating</div>
          </div>
          <div className="p-2 rounded-sm bg-gray-200 cursor-pointer">
            <IoAlertCircleOutline className="text-gray-500" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;
