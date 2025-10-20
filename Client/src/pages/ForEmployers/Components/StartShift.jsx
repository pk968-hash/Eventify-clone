import React, { useState } from "react";
import logos from "../../../assets/EmployerSection/comapanylogos/logo.png";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router";
import { EmployerAvailable, EmployerSignup } from "../../../lib/api";

const StartShift = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
  });
  const { authUser } = useAuth();
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
    <div className="mt-44 flex items-center w-full h-full overflow-hidden bg-white p-15 rounded-md">
      {/* LEFT */}
      <div className={`${authUser ? "w-full" : "w-[67%]"}`}>
        <h1 className="text-gradient text-[3.3rem] font-extrabold leading-16">
          Start with just one shift
        </h1>
        <h3 className="text-gradient text-2xl mt-8">
          You don't have to hire temporary workers across your entire
          organization right away. Start with one shift and change the number of
          workers as needed.
        </h3>
        {/* brands logo */}
        <p className="mt-8">
          Or maybe you need 10 employees for the next week? Challenge accepted.
        </p>
      </div>
      {/* RIGHT */}
      {!authUser && (
        <form
          className="w-[33%] p-6 bg-white/40 rounded-2xl space-y-6"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formData.name}
            placeholder="Name"
            className="w-full rounded-lg px-4 py-3 bg-gray-50 border font-semibold text-[#143E7A] focus:border-[#0096c7] focus:outline-none placeholder:font-semibold placeholder:text-gray-400"
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={formData.email}
            placeholder="Email"
            className="w-full rounded-lg px-4 py-3 bg-gray-50 border font-semibold text-[#143E7A] focus:border-[#0096c7] focus:outline-none placeholder:font-semibold placeholder:text-gray-400"
          />
          <input
            type="text"
            name="phone"
            onChange={handleChange}
            value={formData.phone}
            placeholder="Phone"
            className="w-full rounded-lg px-4 py-3 bg-gray-50 border font-semibold text-[#143E7A] focus:border-[#0096c7] focus:outline-none placeholder:font-semibold placeholder:text-gray-400"
          />
          <input
            type="text"
            name="companyName"
            onChange={handleChange}
            value={formData.companyName}
            placeholder="Company"
            className="w-full rounded-lg px-4 py-3 bg-gray-50 border font-semibold text-[#143E7A] focus:border-[#0096c7] focus:outline-none placeholder:font-semibold placeholder:text-gray-400"
          />
          {error && (
            <p className="w-full bg-red-200 text-red-600 p-2 rounded-md text-xs">
              {error}
            </p>
          )}
          <button
            className="bg-primary bg-primary-hover text-white w-full p-4 rounded-lg font-semibold cursor-pointer transition-all duration-150"
            type="submit"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default StartShift;
