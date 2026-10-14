
import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiActivity,
  FiBarChart2,
  FiSliders,
  FiLayers,
} from "react-icons/fi";

import Navbar from "./Navbar";
import SFImage from "../assets/images/smartfarming.jpg";
import { isDemoMode } from "../demoMode";

const features = [
  {
    icon: <FiActivity size={24} />,
    title: "Environmental monitoring",
    description:
      "View temperature, humidity, and soil moisture readings across different farming environments.",
  },
  {
    icon: <FiBarChart2 size={24} />,
    title: "Sensor analytics",
    description:
      "Explore historical sensor readings through interactive charts and visualizations.",
  },
  {
    icon: <FiSliders size={24} />,
    title: "Customizable thresholds",
    description:
      "Set monitoring ranges and identify readings that require further attention.",
  },
  {
    icon: <FiLayers size={24} />,
    title: "Channel management",
    description:
      "View multiple farming channels from a centralized monitoring dashboard.",
  },
];

function About() {
  return (
    <div className="min-h-screen bg-[#F5F6F2]">
      <Navbar />

      <main>
        {/* Introduction */}
        <section className="mx-auto max-w-7xl px-5 pb-16 pt-16 md:px-10 md:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#548164]">
                About Smart Farming
              </p>

              <h1 className="max-w-xl font-serif text-5xl leading-tight text-[#244D3A] md:text-6xl">
                A smarter way to
                <span className="block italic text-[#548164]">
                  understand your farm.
                </span>
              </h1>

              <p className="mt-7 max-w-lg text-base leading-8 text-[#718375]">
                Smart Farming is a web application designed
                to make agricultural environmental monitoring
                more accessible, organized, and intuitive.
              </p>

              <p className="mt-5 max-w-lg text-base leading-8 text-[#718375]">
                By bringing sensor readings, interactive charts,
                and environmental alerts into one dashboard,
                the application helps users better understand
                changing conditions across farming environments.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#244D3A] px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-[#356B4D]"
                >
                  {isDemoMode ? "Explore Demo" : "View Dashboard"}
                  <FiArrowUpRight />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#D8E3D6] px-6 py-4 text-sm font-medium text-[#244D3A] transition-colors hover:bg-[#EAF2E7]"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-3xl shadow-xl">
                <img
                  src={SFImage}
                  alt="Agricultural farming environment"
                  className="h-[350px] w-full object-cover md:h-[500px]"
                />
              </div>

              <div className="absolute -bottom-5 left-5 right-5 rounded-2xl bg-[#244D3A] px-6 py-5 text-white shadow-lg md:left-auto md:right-[-12px] md:w-64">
                <p className="text-xs uppercase tracking-[0.18em] text-[#B9D0BD]">
                  Our focus
                </p>
                <p className="mt-2 font-serif text-xl">
                  Technology meets agriculture.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="mt-10 bg-[#EAF0E7] py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-10 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#548164]">
                Our purpose
              </p>

              <h2 className="font-serif text-4xl leading-tight text-[#244D3A] md:text-5xl">
                Better visibility.
                <span className="block italic text-[#548164]">
                  Better decisions.
                </span>
              </h2>
            </div>

            <div className="flex items-center">
              <p className="text-base leading-8 text-[#52665A]">
                Our goal is to demonstrate how digital tools
                can simplify agricultural monitoring by turning
                environmental readings into clear, accessible
                information. Smart Farming brings monitoring,
                visualization, and configurable alerts together
                in a single interface.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-10">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#548164]">
              Platform capabilities
            </p>

            <h2 className="font-serif text-4xl text-[#244D3A] md:text-5xl">
              Everything in one place.
            </h2>

            <p className="mt-5 text-base leading-8 text-[#718375]">
              Explore the tools that make environmental
              monitoring easier to understand.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-[#E1E8DE] bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-6 inline-flex rounded-xl bg-[#E9F1E8] p-4 text-[#326547]">
                  {feature.icon}
                </div>

                <h3 className="font-serif text-2xl text-[#244D3A]">
                  {feature.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#718375]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Demo information */}
        <section className="bg-[#244D3A] px-5 py-20 text-white md:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-[#B9D0BD]">
              Experience Smart Farming
            </p>

            <h2 className="font-serif text-4xl md:text-5xl">
              See the platform in action.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-[#D3E1D6]">
              Explore the interactive dashboard, view sample
              environmental readings, and experiment with
              monitoring thresholds.
              {isDemoMode &&
                " This portfolio demonstration uses simulated data and does not connect to live sensors."}
            </p>

            <Link
              to="/dashboard"
              className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-semibold text-[#244D3A] transition-colors hover:bg-[#EAF2E7]"
            >
              {isDemoMode ? "Explore Demo" : "Open Dashboard"}
              <FiArrowUpRight />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default About;
