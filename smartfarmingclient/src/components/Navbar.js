
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo22.png";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="relative z-50 w-full border-b border-[#E0E6DD] bg-[#F5F6F2]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10">

        {/* Logo and brand */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#244D3A] p-2">
            <img
              src={Logo}
              alt=""
              className="h-full w-full object-contain"
            />
          </div>

          <div>
            <span className="block text-lg font-semibold tracking-tight text-[#244D3A]">
              Smart Farming
            </span>
            <span className="block text-[10px] uppercase tracking-[0.18em] text-[#7A8C7D]">
              Agricultural Technology
            </span>
          </div>
        </Link>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="main-navigation"
          className="rounded-lg p-2 text-2xl text-[#244D3A] transition-colors hover:bg-[#E3EBE1] md:hidden"
        >
          {isOpen ? <AiOutlineClose /> : <BiMenuAltRight />}
        </button>

        {/* Navigation links */}
        <div
          id="main-navigation"
          className={`${
            isOpen ? "block" : "hidden"
          } absolute left-0 right-0 top-full border-b border-[#E0E6DD] bg-[#F5F6F2] px-5 py-5 shadow-lg md:static md:block md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          <ul className="flex flex-col gap-2 md:flex-row md:items-center md:gap-8">
            <li>
              <Link
                to="/about"
                onClick={closeMenu}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-[#526B58] transition-colors hover:bg-[#E3EBE1] hover:text-[#244D3A] md:px-0 md:py-2 md:hover:bg-transparent"
              >
                About
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                onClick={closeMenu}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-[#526B58] transition-colors hover:bg-[#E3EBE1] hover:text-[#244D3A] md:px-0 md:py-2 md:hover:bg-transparent"
              >
                Contact
              </Link>
            </li>

            <li className="md:ml-2">
              <Link
                to="/request"
                onClick={closeMenu}
                className="block rounded-lg bg-[#244D3A] px-5 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[#356B4D]"
              >
                Get Started ↗
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
