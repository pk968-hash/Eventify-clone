import React from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router";

const BottomSignup = () => {
  return (
    <div className="w-full bg-white rounded-4xl flex flex-col items-center justify-center py-20 gap-14">
      <h1 className="text-5xl font-extrabold  leading-tight text-primary">
        Sign up and employ your free time
      </h1>
      <Link
        to="/login"
        className="flex items-center justify-center gap-2 bg-primary bg-primary-hover text-white w-full max-w-[20rem] py-4 rounded-xl font-semibold transition-all duration-150"
      >
        <IoSearch size={20} />
        <span>Sign Up</span>
      </Link>
    </div>
  );
};

export default BottomSignup;
