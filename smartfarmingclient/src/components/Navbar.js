import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo22.png";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const [isopen, setisOpen] = useState(false);
  const toggleMenu = () => setisOpen(!isopen);

  return (
    <nav className="w-full py-3 px-10 bg-primaryColor text-white flex flex-wrap relative">
      <div className="container flex flex-wrap items-center mx-auto  justify-between">
        <a href="/" className="flex items-center text-xl ">
          <img src={Logo} alt="logo" className="w-10" />
          <span>Smart Farming</span>
        </a>
        <button onClick={toggleMenu} className=" text-2xl block md:hidden">
          {isopen ? <AiOutlineClose /> : <BiMenuAltRight />}
        </button>
        <div
          className={`${
            isopen
              ? "block absolute top-[99%] right-0 bg-primaryColor md:static"
              : "hidden"
          }  md:block w-full md:w-auto`}
        >
          <ul className="flex flex-col  md:flex-row gap-x-6 text-xl px-3 md:px-0 py-6 md:py-0">
            <Link to="/about">
              <li className="py-2.5 px-3 rounded-md text-center md:px-0 md:py-0 hover:bg-buttonColor md:hover:bg-transparent md:hover:underline underline-offset-8 transition duration-300 hover:text-textColor">
                About
              </li>
            </Link>
            <Link to="/contact">
              <li className="py-2.5  px-3 rounded-md text-center md:px-0 md:py-0 hover:bg-buttonColor md:hover:bg-transparent md:hover:underline underline-offset-8   hover:text-textColor transition duration-300">
                Contact
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
