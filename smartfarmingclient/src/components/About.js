import React from "react";
import LineImage from "../assets/images/line1.png";
import SFImage from "../assets/images/smartfarming.jpg";
import Navbar from "./Navbar";
function About() {
  return (
    <>
      <Navbar />
      <div className="w-full h-full flex flex-col items-center gap-y-6 p-5">
        <div className="w-1/2 lg:w-1/4 py-5">
          <img className="w-full h-full " src={LineImage} alt="Line" />
        </div>
        <div className=" flex flex-col lg:flex-row lg:gap-x-6 gap-y-6 px-5">
          <div className="w-3/4 lg:w-1/2 mx-auto">
            <img className="w-full h-full" src={SFImage} alt="smartfarming" />
          </div>
          <div className="w-full lg:w-2/3">
            <p className="leading-loose text-base">
              <span className="text-green-900 font-bold text-lg lg:text-xl">
                {" "}
                Smart Farming
              </span>
              , was founded by a team of agriculture experts. SmartFarm
              harnesses the power of technology alongside both know-how and the
              experience necessary for optimizing dairy farms around the world.
              Utilizing cloud-based technologies SmartFarm is able to help
              farmers minimize their costs and optimize their productivity which
              enables farmers to grow their business and increase profit.
              <div className="text-green-900 font-bold text-lg md:text-xl mt-5">
                Our Mission
              </div>{" "}
              To provide medium- to large-scale farmers with precision
              irrigation monitoring and control systems that will revolutionize
              their ability to conserve water and energy, improve crop yields,
              and reduce labor and equipment maintenance costs.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
