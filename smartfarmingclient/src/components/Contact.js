
import React from "react";
import { Link } from "react-router-dom";
import {
  FiMail,
  FiArrowUpRight,
  FiMessageCircle,
  FiShield,
} from "react-icons/fi";

import Navbar from "./Navbar";
import { isDemoMode } from "../demoMode";

function Contact() {
  return (
    <div className="min-h-screen bg-[#F5F6F2]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        {/* Heading */}
        <div className="mb-14 max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#548164]">
            Get in touch
          </p>

          <h1 className="font-serif text-5xl leading-tight text-[#244D3A] md:text-6xl">
            Let's start a
            <span className="block italic text-[#548164]">
              conversation.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-[#718375]">
            Have a question about Smart Farming, want to
            discuss the project, or simply explore how it
            works? We'd love to hear from you.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Main contact card */}
          <section className="rounded-3xl border border-[#E1E8DE] bg-white p-8 shadow-sm md:p-12 lg:col-span-3">
            <div className="mb-8 inline-flex rounded-2xl bg-[#E9F1E8] p-4 text-[#326547]">
              <FiMail size={28} />
            </div>

            <h2 className="font-serif text-3xl text-[#244D3A]">
              Contact the project
            </h2>

            <p className="mt-5 max-w-md text-sm leading-8 text-[#718375]">
              For questions, feedback, or collaboration
              opportunities related to Smart Farming,
              you can reach out by email.
            </p>

            <div className="mt-9 rounded-2xl bg-[#F5F8F3] p-6">
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-[#548164]">
                Email
              </p>

              <a
                href="mailto:smartfarmingco@gmail.com"
                className="break-all text-lg font-medium text-[#244D3A] hover:underline"
              >
                smartfarmingco@gmail.com
              </a>
            </div>

            <a
              href="mailto:smartfarmingco@gmail.com?subject=Smart%20Farming%20Project%20Inquiry"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#244D3A] px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-[#356B4D]"
            >
              Send an email
              <FiArrowUpRight />
            </a>
          </section>

          {/* Side information */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <section className="flex-1 rounded-3xl bg-[#244D3A] p-8 text-white md:p-10">
              <div className="mb-8 inline-flex rounded-2xl bg-[#416C52] p-4 text-[#D5E2D8]">
                <FiMessageCircle size={26} />
              </div>

              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#B9D0BD]">
                Explore the platform
              </p>

              <h2 className="font-serif text-3xl leading-tight">
                See Smart Farming
                <span className="block italic text-[#C9D9B3]">
                  in action.
                </span>
              </h2>

              <p className="mt-6 text-sm leading-8 text-[#D3E1D6]">
                Discover environmental monitoring,
                interactive sensor charts, and
                configurable farm-health alerts.
              </p>

              <Link
                to="/dashboard"
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-[#244D3A] transition-colors hover:bg-[#EAF2E7]"
              >
                {isDemoMode ? "Explore Demo" : "Open Dashboard"}
                <FiArrowUpRight />
              </Link>
            </section>

            <section className="rounded-3xl border border-[#E1E8DE] bg-white p-8">
              <div className="mb-4 text-[#548164]">
                <FiShield size={25} />
              </div>

              <h3 className="font-serif text-xl text-[#244D3A]">
                About this project
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#718375]">
                {isDemoMode
                  ? "This is an interactive portfolio demonstration. Sensor readings are simulated, and no live monitoring service is connected."
                  : "Smart Farming brings agricultural monitoring tools together in one application."}
              </p>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-[#D9E1D7] pt-6">
          <p className="text-xs text-[#8A958C]">
            Smart Farming · Agricultural Technology
          </p>
        </div>
      </main>
    </div>
  );
}

export default Contact;
