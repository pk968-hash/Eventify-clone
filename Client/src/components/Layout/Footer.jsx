import React from "react";
import logo from "../../assets/logo.png";
import { MdOutlineMail } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="px-28 my-16 grid grid-cols-1 lg:grid-cols-4 items-center gap-20">
      <div>
        <img src={logo} alt="logo" className="w-36" draggable="false" />
      </div>
      <div>
        <ul className="text-sm">
          <li>UAB Workis</li>
          <li>Gedimino pr. 26</li>
          <li>LT-01104 Vilnius</li>
          <li>Lietuva</li>
        </ul>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <a
            href="mailto:support@workis.online"
            className="flex items-center gap-2"
          >
            <MdOutlineMail size={22} className="text-gray-600" />
            <p className="hover:underline text-sm">support@workis.online</p>
          </a>
          <MdArrowOutward />
        </div>
        <div className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <FaFacebook size={20} className="text-gray-600" />
            <p className="hover:underline text-sm">Facebook</p>
          </a>
          <MdArrowOutward />
        </div>
      </div>

      <ul className="space-y-1">
        <Link className="flex items-center justify-between">
          <p className="hover:underline text-sm">Reviews</p>
          <MdArrowOutward />
        </Link>
        <Link className="flex items-center justify-between">
          <p className="hover:underline text-sm">Terms and conditions</p>
          <MdArrowOutward />
        </Link>
        <Link className="flex items-center justify-between">
          <p className="hover:underline text-sm">Privacy policy</p>
          <MdArrowOutward />
        </Link>
      </ul>
    </div>
  );
};

export default Footer;
