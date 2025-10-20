import logos from "../../../assets/EmployerSection/comapanylogos/logo.png";
import { useState } from "react";
import { useNavigate } from "react-router";
import { EmployerAvailable } from "../../../lib/api";
import { useAuth } from "../../../context/AuthContext";
const EmployerHero = () => {
  const { authUser } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const response = await EmployerAvailable(formData);
      if (response.success === true) {
        navigate("/employer/onboarding", { state: { userDetails: formData } });
      }
    } catch (error) {
      setError(error.response?.data?.message);
      console.log(error.response?.data);
    }
  };

  return (
    <div className="mt-20 flex items-center w-full h-full">
      {/* LEFT */}
      <div
        className={`bg-white rounded-l-2xl px-16 py-16 ${
          authUser ? "w-full" : " w-[67%]"
        }`}
      >
        <h1 className="text-gradient text-[3.3rem] font-extrabold leading-16">
          Keep the business momentum
        </h1>
        <h3 className="text-gradient text-2xl mt-8">
          Quick addition to the team without the hassle of recruitment.
        </h3>
        {/* brands logo */}
        <div className="mt-8 flex items-center justify-center">
          <img src={logos} alt="company_logos" draggable="false" />
        </div>
      </div>
      {/* RIGHT */}
      {!authUser && (
        <form
          onSubmit={handleSubmit}
          className="w-[33%] p-6 bg-white rounded-r-2xl space-y-6"
          style={{ boxShadow: "-8px 0px 16px -4px rgba(0,0,0,0.1)" }}
        >
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Name"
            className="w-full rounded-lg px-4 py-3 bg-gray-50 border font-bold text-lg text-[#143E7A] focus:border-[#0096c7] focus:outline-none placeholder:font-bold placeholder:text-gray-400 placeholder:text-lg"
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Email"
            className="w-full rounded-lg px-4 py-3 bg-gray-50 border font-bold text-lg text-[#143E7A] focus:border-[#0096c7] focus:outline-none placeholder:font-bold placeholder:text-gray-400 placeholder:text-lg"
          />
          <input
            type="text"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
            placeholder="Phone"
            className="w-full rounded-lg px-4 py-3 bg-gray-50 border font-bold text-lg text-[#143E7A] focus:border-[#0096c7] focus:outline-none placeholder:font-bold placeholder:text-gray-400 placeholder:text-lg"
          />
          <input
            type="text"
            name="companyName"
            onChange={handleChange}
            value={formData.companyName}
            placeholder="Company"
            className="w-full rounded-lg px-4 py-3 bg-gray-50 border font-bold text-lg text-[#143E7A] focus:border-[#0096c7] focus:outline-none placeholder:font-bold placeholder:text-gray-400 placeholder:text-lg"
          />
          {error && (
            <p className="w-full bg-red-200 text-red-600 p-2 rounded-md text-xs">
              {error}
            </p>
          )}
          <button
            className="bg-primary bg-primary-hover text-white w-full p-4 rounded-lg text-lg font-bold cursor-pointer transition-all duration-150"
            type="submit"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default EmployerHero;
