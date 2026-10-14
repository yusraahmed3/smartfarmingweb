
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isDemoMode } from "../demoMode";
import {
  getChannelHealth,
  useFarmThresholds,
} from "../utils/farmHealth";
import {
  FiThermometer,
  FiDroplet,
  FiActivity,
  FiArrowUpRight,
  FiLayers,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Cards } from "./Cards";
import { demoChannels } from "../data/demoChannels";

import { fetchChannels } from "../redux/features/channelSlice";
import { Loadingpage } from "./Loadingpage";
import Sidebar from "./Sidebar";

const isDevelopment = isDemoMode;
const demoTrends = [
  { day: "Mon", temperature: 22 },
  { day: "Tue", temperature: 24 },
  { day: "Wed", temperature: 23 },
  { day: "Thu", temperature: 27 },
  { day: "Fri", temperature: 25 },
  { day: "Sat", temperature: 26 },
  { day: "Sun", temperature: 24 },
];

function StatCard({ label, value, description, icon }) {
  return (
    <div className="rounded-2xl border border-[#E1E8DE] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#718375]">{label}</p>
        <div className="rounded-xl bg-[#E9F1E8] p-3 text-[#326547]">
          {icon}
        </div>
      </div>

      <h3 className="mt-5 text-3xl font-semibold text-[#244D3A]">
        {value}
      </h3>

      <p className="mt-2 text-xs text-[#829085]">
        {description}
      </p>
    </div>
  );
}

function Dashboard() {
  const dispatch = useDispatch();
  const { loading, channels } = useSelector(
    (state) => state.channel
  );

  useEffect(() => {
    if (!isDevelopment) {
      dispatch(fetchChannels());
    }
  }, [dispatch]);

  const channelList = Array.isArray(channels) ? channels : [];
  const thresholds = useFarmThresholds();
  const demoAlerts = demoChannels.flatMap((channel) => {
const health = getChannelHealth(channel, thresholds);

  return health.alerts.map((alert) => ({
    ...alert,
    channelName: channel.name,
    channelId: channel.id,
  }));
});

  return (
    <div className="flex min-h-screen bg-[#F5F6F2]">
      <Sidebar />

<main className="min-w-0 flex-1 px-5 pb-8 pt-20 md:px-10 lg:py-12">
          <div className="mx-auto max-w-7xl">

          <header className="mb-9 flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#548164]">
                Smart Farming / Overview
              </p>

              <h1 className="font-serif text-4xl text-[#244D3A] md:text-5xl">
                Farm overview.
              </h1>

              <p className="mt-3 text-sm text-[#718375]">
                A clearer view of your farming environment.
              </p>
            </div>

            <div className="rounded-2xl bg-[#E6EFE4] p-4 text-[#326547]">
              <FiActivity size={26} />
            </div>
          </header>

          {isDevelopment && (
            <div className="mb-7 rounded-xl border border-[#D7E6D4] bg-[#EAF2E7] px-5 py-3 text-sm text-[#42674D]">
              Demo preview — readings below are fictional,
              not live sensor data.
            </div>
          )}

          {isDevelopment ? (
            <>
              <section className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  label="Temperature"
                  value="24.5°C"
                  description="Sample temperature reading"
                  icon={<FiThermometer size={22} />}
                />

                <StatCard
                  label="Humidity"
                  value="68%"
                  description="Sample humidity reading"
                  icon={<FiDroplet size={22} />}
                />

                <StatCard
                  label="Soil moisture"
                  value="420"
                  description="Sample sensor reading"
                  icon={<FiActivity size={22} />}
                />

                <StatCard
                  label="Farm channels"
                  value="03"
                  description="Example connected channels"
                  icon={<FiLayers size={22} />}
                />
              </section>

              <section className="grid gap-6 xl:grid-cols-3">
                <div className="rounded-2xl border border-[#E1E8DE] bg-white p-6 shadow-sm xl:col-span-2">
                  <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="font-serif text-2xl text-[#244D3A]">
                        Temperature trends
                      </h2>
                      <p className="mt-1 text-sm text-[#829085]">
                        Sample readings over seven days
                      </p>
                    </div>

                    <span className="rounded-full bg-[#EAF2E7] px-3 py-2 text-xs text-[#42674D]">
                      Last 7 days
                    </span>
                  </div>

                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={demoTrends}>
                        <CartesianGrid
                          stroke="#E8EEE7"
                          strokeDasharray="3 3"
                        />
                        <XAxis dataKey="day" />
                        <YAxis domain={[15, 35]} />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="temperature"
                          stroke="#326547"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#244D3A] p-7 text-white">
                  <p className="text-xs uppercase tracking-[0.2em] text-[#B9D0BD]">
                    Farm insights
                  </p>

                  <h2 className="mt-8 font-serif text-3xl leading-tight">
                    Better insights.
                    <span className="block italic text-[#C9D9B3]">
                      Better decisions.
                    </span>
                  </h2>

                  <p className="mt-6 text-sm leading-7 text-[#D3E1D6]">
                    Track environmental conditions and make
                    informed decisions about your crops.
                  </p>

                  <div className="mt-10 flex items-center gap-2 text-sm text-[#C9D9B3]">
                    Explore your farm
                    <FiArrowUpRight />
                  </div>
                </div>
              </section>
                <section className="mt-10">
                <div className="mb-6">
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#548164]">
                    Farm monitoring
                  </p>

                  <h2 className="font-serif text-3xl text-[#244D3A]">
                    Your farming channels.
                  </h2>

                  <p className="mt-2 text-sm text-[#718375]">
                    Explore sample readings for each farming environment.
                  </p>
                </div>

                <Cards channels={demoChannels} />
              </section>
              
{/* Alerts and farm health */}
<section className="mt-10">
  <div className="mb-6">
    <p className="mb-2 text-xs uppercase tracking-[0.2em] text-[#548164]">
      Environmental monitoring
    </p>

    <h2 className="font-serif text-3xl text-[#244D3A]">
      Alerts & farm health.
    </h2>

    <p className="mt-2 text-sm text-[#718375]">
      Demonstration alerts based on configurable sensor thresholds.
    </p>
  </div>

  <div className="rounded-2xl border border-[#E1E8DE] bg-white p-6 shadow-sm md:p-8">
    <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
      <div>
        <p className="text-sm text-[#718375]">
          Readings requiring review
        </p>

        <p className="mt-2 text-4xl font-semibold text-[#244D3A]">
          {demoAlerts.length}
        </p>
      </div>

      <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-medium text-amber-800">
        Demo thresholds
      </span>
    </div>

    {demoAlerts.length === 0 ? (
      <div className="rounded-xl bg-[#EAF2E7] p-5 text-sm text-[#326547]">
        All available demo readings are within the configured ranges.
      </div>
    ) : (
      <div className="space-y-4">
        {demoAlerts.map((alert) => (
          <div
            key={`${alert.channelId}-${alert.key}`}
            className="rounded-xl border border-amber-200 bg-amber-50 p-5"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-semibold text-[#244D3A]">
                {alert.channelName}
              </h3>

              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                Needs review
              </span>
            </div>

            <p className="text-sm text-[#755B32]">
              {alert.message}
            </p>

            <p className="mt-3 text-sm text-[#52665A]">
              <strong>Suggested check:</strong>{" "}
              {alert.recommendation}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
</section>


       
            </>
          ) : (
            <section className="rounded-2xl border border-[#E1E8DE] bg-white p-6">
              <h2 className="mb-5 font-serif text-2xl text-[#244D3A]">
                Your channels
              </h2>

              {loading ? (
                <Loadingpage />
              ) : channelList.length > 0 ? (
                <Cards channels={channelList} />
              ) : (
                <p className="text-sm text-[#718375]">
                  No channels available.
                </p>
              )}
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
