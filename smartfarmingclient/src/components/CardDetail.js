
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Sidebar from "./Sidebar";
import { demoChannels } from "../data/demoChannels";
import { isDemoMode } from "../demoMode";
import {
  getChannelHealth,
  getLatestReading,
  useFarmThresholds,
} from "../utils/farmHealth";

function CardDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const thresholds = useFarmThresholds();

const channel =
  location.state?.channel ||
  (isDemoMode ? demoChannels[0] : null);

  const [selectedSensor, setSelectedSensor] = useState("temperature");

  if (!channel) {
    return (
      <div className="flex min-h-screen bg-[#F5F6F2]">
        <Sidebar />
        <main className="flex-1 p-8">
          <h1 className="text-2xl font-semibold text-[#244D3A]">
            Channel not found
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-5 text-[#244D3A] underline"
          >
            Back to dashboard
          </button>
        </main>
      </div>
    );
  }

const channelHealth = getChannelHealth(channel, thresholds);

  const sensors = [
    {
      key: "temperature",
      label: channel.fieldName1 || "Temperature",
      unit: "°C",
      readings: channel.fieldValue1 || [],
    },
    {
      key: "humidity",
      label: channel.fieldName2 || "Humidity",
      unit: "%",
      readings: channel.fieldValue2 || [],
    },
    {
      key: "moisture",
      label: channel.fieldName3 || "Soil Moisture",
      unit: "",
      readings: channel.fieldValue3 || [],
    },
  ];

  const activeSensor =
    sensors.find((sensor) => sensor.key === selectedSensor) ||
    sensors[0];

  const chartData = activeSensor.readings.map((reading) => ({
    time: new Date(reading.date * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    value: Number(reading.value),
  }));

  return (
    <div className="flex min-h-screen bg-[#F5F6F2]">
      <Sidebar />

<main className="min-w-0 flex-1 px-5 pb-8 pt-20 md:px-8 lg:p-10">
          <div className="mx-auto max-w-6xl">
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-7 text-sm font-medium text-[#548164] hover:text-[#244D3A]"
          >
            ← Back to dashboard
          </button>

          {/* Page heading */}
          <div className="mb-8">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#548164]">
              Channel monitoring
            </p>

            <h1 className="font-serif text-4xl text-[#244D3A]">
              {channel.name}
            </h1>

            <p className="mt-3 text-sm text-[#718375]">
              Explore environmental readings and sensor history.
            </p>

            {isDemoMode && (
              <span className="mt-4 inline-block rounded-full bg-[#E3F0E2] px-3 py-1 text-xs text-[#326547]">
                Demo data
              </span>
            )}
          </div>

          {/* Sensor cards */}
          <div className="mb-8 grid gap-5 md:grid-cols-3">
            {sensors.map((sensor) => {
              const value = getLatestReading(sensor.readings);
              const isActive = selectedSensor === sensor.key;

              return (
                <button
                  key={sensor.key}
                  type="button"
                  onClick={() => setSelectedSensor(sensor.key)}
                  className={`rounded-2xl border p-6 text-left shadow-sm transition ${
                    isActive
                      ? "border-[#244D3A] bg-[#EAF2E7] ring-1 ring-[#244D3A]"
                      : "border-[#E1E8DE] bg-white hover:border-[#9AB6A0]"
                  }`}
                >
                  <p className="text-sm text-[#718375]">
                    {sensor.label}
                  </p>

                  <p className="mt-4 text-3xl font-semibold text-[#244D3A]">
                    {value === null
                      ? "No data"
                      : `${value}${sensor.unit}`}
                  </p>

                  <p className="mt-3 text-xs text-[#548164]">
                    {isActive ? "Viewing history" : "Click to view history"}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Farm health alerts */}
          <section className="mb-8 rounded-2xl border border-[#E1E8DE] bg-white p-6 shadow-sm md:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-serif text-2xl text-[#244D3A]">
                Farm health
              </h2>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  channelHealth.status === "attention"
                    ? "bg-amber-100 text-amber-800"
                    : channelHealth.status === "incomplete"
                    ? "bg-gray-100 text-gray-700"
                    : "bg-[#E3F0E2] text-[#326547]"
                }`}
              >
                {channelHealth.status === "attention"
                  ? "Needs review"
                  : channelHealth.status === "incomplete"
                  ? "Incomplete readings"
                  : "Within demo ranges"}
              </span>
            </div>

            {channelHealth.alerts.length > 0 ? (
              <div className="space-y-4">
                {channelHealth.alerts.map((alert) => (
                  <div
                    key={alert.key}
                    className="rounded-xl border border-amber-200 bg-amber-50 p-5"
                  >
                    <p className="font-medium text-amber-900">
                      {alert.message}
                    </p>

                    <p className="mt-2 text-sm text-[#52665A]">
                      <strong>Suggested check:</strong>{" "}
                      {alert.recommendation}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#52665A]">
                {channelHealth.missingReadings > 0
                  ? "Some sensor readings are unavailable."
                  : "All available readings are within the demonstration thresholds."}
              </p>
            )}

            {channelHealth.missingReadings > 0 &&
              channelHealth.alerts.length > 0 && (
                <p className="mt-4 text-sm text-[#718375]">
                  {channelHealth.missingReadings} sensor reading(s)
                  unavailable.
                </p>
              )}

            <p className="mt-5 text-xs text-[#8A988C]">
              Statuses use demonstration thresholds, not
              crop-specific safety recommendations.
            </p>
          </section>

          {/* Interactive chart */}
          <section className="rounded-2xl border border-[#E1E8DE] bg-white p-6 shadow-sm md:p-8">
            <div className="mb-7">
              <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#548164]">
                Sensor analytics
              </p>

              <h2 className="font-serif text-2xl text-[#244D3A]">
                {activeSensor.label} history
              </h2>

              <p className="mt-2 text-sm text-[#718375]">
                Select a sensor above to explore its readings.
              </p>
            </div>

            {chartData.length > 0 ? (
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{
                      top: 10,
                      right: 20,
                      left: -15,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#E1E8DE"
                    />

                    <XAxis
                      dataKey="time"
                      tick={{ fill: "#718375", fontSize: 12 }}
                    />

                    <YAxis
                      tick={{ fill: "#718375", fontSize: 12 }}
                    />

                    <Tooltip />

                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#244D3A"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-sm text-[#718375]">
                No readings available for this sensor.
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default CardDetail;
