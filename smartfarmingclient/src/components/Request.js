
import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowUpRight,
  FiUserCheck,
  FiMonitor,
  FiShield,
  FiMail,
} from "react-icons/fi";

import Navbar from "./Navbar";
import { isDemoMode } from "../demoMode";

// Keep the original account-request form in a separate
// component if you plan to restore backend registration later.

function Request() {
  return (
    <div className="min-h-screen bg-[#F5F6F2]">
      <Navbar />

      <main className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-24">
        {/* Page introduction */}
        <div className="mb-14 max-w-3xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#548164]">
            Account access
          </p>

          <h1 className="font-serif text-5xl leading-tight text-[#244D3A] md:text-6xl">
            Experience smarter
            <span className="block italic text-[#548164]">
              farm monitoring.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-[#718375]">
            Smart Farming brings environmental monitoring,
            sensor analytics, and configurable alerts
            together in one intuitive platform.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Primary access card */}
          <section className="rounded-3xl border border-[#E1E8DE] bg-white p-8 shadow-sm md:p-12 lg:col-span-3">
            <div className="mb-8 inline-flex rounded-2xl bg-[#E9F1E8] p-4 text-[#326547]">
              <FiUserCheck size={28} />
            </div>

            <h2 className="font-serif text-3xl text-[#244D3A]">
              {isDemoMode
                ? "No account required."
                : "Account registration"}
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-8 text-[#718375]">
              {isDemoMode
                ? "This version of Smart Farming is an interactive portfolio demonstration. You can explore the dashboard, view farming channels, and experiment with monitoring settings without registering or sharing personal information."
                : "Account registration is currently unavailable. Please contact the project administrator for information about access."}
            </p>

            {isDemoMode && (
              <div className="mt-9 rounded-2xl bg-[#F5F8F3] p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#548164]">
                  Demo access
                </p>

                <p className="mt-3 text-sm leading-7 text-[#52665A]">
                  No email address, password, or identification
                  documents are needed. All environmental
                  readings are simulated for demonstration.
                </p>
              </div>
            )}

            <Link
              to={isDemoMode ? "/dashboard" : "/contact"}
              className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#244D3A] px-7 py-4 text-sm font-medium text-white transition-colors hover:bg-[#356B4D]"
            >
              {isDemoMode ? "Explore Demo" : "Contact Us"}
              <FiArrowUpRight />
            </Link>
          </section>

          {/* Supporting information */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <section className="rounded-3xl bg-[#244D3A] p-8 text-white md:p-10">
              <div className="mb-7 inline-flex rounded-2xl bg-[#416C52] p-4 text-[#D5E2D8]">
                <FiMonitor size={26} />
              </div>

              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-[#B9D0BD]">
                What you can explore
              </p>

              <h2 className="font-serif text-3xl leading-tight">
                Discover the
                <span className="block italic text-[#C9D9B3]">
                  platform.
                </span>
              </h2>

              <ul className="mt-7 space-y-4 text-sm leading-7 text-[#D3E1D6]">
                <li>• Environmental sensor readings</li>
                <li>• Interactive monitoring charts</li>
                <li>• Farm-health alerts</li>
                <li>• Customizable monitoring thresholds</li>
              </ul>
            </section>

            <section className="rounded-3xl border border-[#E1E8DE] bg-white p-8">
              <FiShield size={26} className="text-[#548164]" />

              <h3 className="mt-5 font-serif text-xl text-[#244D3A]">
                Your privacy matters.
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#718375]">
                The public demo does not require account
                registration. Demo preferences are stored
                locally in your browser.
              </p>
            </section>
          </div>
        </div>

        {/* Bottom contact section */}
        <section className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#EAF0E7] p-8 md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="font-serif text-2xl text-[#244D3A]">
              Have questions about Smart Farming?
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#718375]">
              Get in touch to learn more about the project.
            </p>
          </div>

          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-[#B9CDBA] px-6 py-3 text-sm font-medium text-[#244D3A] transition-colors hover:bg-white"
          >
            <FiMail />
            Contact Us
          </Link>
        </section>
      </main>
    </div>
  );
}

export default Request;
