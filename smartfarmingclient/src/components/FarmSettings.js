
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  useFarmThresholds,
  saveThresholds,
  resetThresholds,
} from "../utils/farmHealth";

function FarmSettings() {
  const navigate = useNavigate();
  const savedThresholds = useFarmThresholds();

  const [form, setForm] = useState(() => {
    const initial = {};

    Object.keys(savedThresholds).forEach((key) => {
      initial[key] = {
        min: String(savedThresholds[key].min),
        max: String(savedThresholds[key].max),
      };
    });

    return initial;
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const updateField = (key, field, value) => {
    setForm((previous) => ({
      ...previous,
      [key]: {
        ...previous[key],
        [field]: value,
      },
    }));

    setMessage("");
    setError("");
  };

  const handleSave = (event) => {
    event.preventDefault();

    const updated = {};

    for (const key of Object.keys(savedThresholds)) {
      const minText = form[key].min.trim();
      const maxText = form[key].max.trim();

      if (minText === "" || maxText === "") {
        setError("Please fill in every minimum and maximum value.");
        return;
      }

      const min = Number(minText);
      const max = Number(maxText);

      if (
        !Number.isFinite(min) ||
        !Number.isFinite(max) ||
        min >= max
      ) {
        setError(
          "Every minimum must be a valid number smaller than its maximum."
        );
        return;
      }

      updated[key] = {
        ...savedThresholds[key],
        min,
        max,
      };
    }

    saveThresholds(updated);
    setError("");
    setMessage("Settings saved successfully!");
  };

  const handleReset = () => {
    resetThresholds();

    const defaults = {
      temperature: { min: "15", max: "30" },
      humidity: { min: "40", max: "75" },
      moisture: { min: "300", max: "750" },
    };

    setForm(defaults);
    setError("");
    setMessage("Default demo thresholds restored.");
  };

  return (
    <div className="flex min-h-screen bg-[#F5F6F2]">
      <Sidebar />

      <main className="min-w-0 flex-1 p-5 md:p-8 lg:p-10">
        <div className="mx-auto max-w-5xl">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="mb-7 text-sm font-medium text-[#548164] hover:text-[#244D3A]"
          >
            ← Back to dashboard
          </button>

          <div className="mb-9">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#548164]">
              Monitoring preferences
            </p>

            <h1 className="font-serif text-4xl text-[#244D3A]">
              Farm settings.
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#718375]">
              Customize the demonstration thresholds used to
              identify sensor readings that need review.
            </p>
          </div>

          <form onSubmit={handleSave}>
            <div className="rounded-2xl border border-[#E1E8DE] bg-white p-6 shadow-sm md:p-8">
              <div className="mb-8">
                <h2 className="font-serif text-2xl text-[#244D3A]">
                  Sensor thresholds
                </h2>

                <p className="mt-2 text-sm text-[#718375]">
                  Set an acceptable minimum and maximum
                  for each monitored sensor.
                </p>
              </div>

              <div className="space-y-7">
                {Object.keys(savedThresholds).map((key) => {
                  const sensor = savedThresholds[key];

                  return (
                    <div
                      key={key}
                      className="rounded-xl border border-[#E5EBE2] bg-[#FAFBF8] p-5"
                    >
                      <div className="mb-5 flex items-center justify-between">
                        <h3 className="font-semibold text-[#244D3A]">
                          {sensor.label}
                        </h3>

                        <span className="text-xs text-[#718375]">
                          {sensor.unit || "Raw sensor units"}
                        </span>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor={`${key}-min`}
                            className="mb-2 block text-sm text-[#52665A]"
                          >
                            Minimum value
                          </label>

                          <input
                            id={`${key}-min`}
                            type="number"
                            step="any"
                            required
                            value={form[key].min}
                            onChange={(event) =>
                              updateField(
                                key,
                                "min",
                                event.target.value
                              )
                            }
                            className="w-full rounded-lg border border-[#D8E3D6] bg-white px-4 py-3 text-[#244D3A] outline-none focus:border-[#548164]"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`${key}-max`}
                            className="mb-2 block text-sm text-[#52665A]"
                          >
                            Maximum value
                          </label>

                          <input
                            id={`${key}-max`}
                            type="number"
                            step="any"
                            required
                            value={form[key].max}
                            onChange={(event) =>
                              updateField(
                                key,
                                "max",
                                event.target.value
                              )
                            }
                            className="w-full rounded-lg border border-[#D8E3D6] bg-white px-4 py-3 text-[#244D3A] outline-none focus:border-[#548164]"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {error && (
                <p
                  role="alert"
                  className="mt-6 rounded-lg bg-red-50 p-4 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              {message && (
                <p
                  role="status"
                  className="mt-6 rounded-lg bg-[#E3F0E2] p-4 text-sm text-[#326547]"
                >
                  {message}
                </p>
              )}

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-xl bg-[#244D3A] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#326547]"
                >
                  Save settings
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-xl border border-[#D8E3D6] px-7 py-3 text-sm font-medium text-[#244D3A] hover:bg-[#F5F6F2]"
                >
                  Restore defaults
                </button>
              </div>
            </div>
          </form>

          <p className="mt-5 text-xs leading-5 text-[#8A988C]">
            Development preview: settings are stored in this
            browser only. They do not control physical sensors
            or irrigation equipment.
          </p>
        </div>
      </main>
    </div>
  );
}

export default FarmSettings;
