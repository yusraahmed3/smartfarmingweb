import React from "react";
import Navbar from "./Navbar";

function Contact() {
  return (
    <>
      <Navbar />
      <div className="w-full h-full flex flex-col gap-5 items-start p-16">
        <h1 className="text-3xl font-bold text-green-900">Contact Us</h1>
        <div className="flex flex-col gap-5 text-lg">
          <div className="">
            5 Kilo, Arada <br />
            Addis Ababa, Ethiopia
          </div>
          <div className="address">Phone: +25196857489</div>
          <div className="address">Email: smartfarmingco@gmail.com</div>
        </div>
      </div>
    </>
  );
}

export default Contact;
