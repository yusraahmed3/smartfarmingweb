

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  getChannelHealth,
  useFarmThresholds,
} from "../utils/farmHealth";
import {
  FiArrowUpRight,
  FiThermometer,
  FiDroplet,
  FiActivity,
} from "react-icons/fi";

const latest = (readings) => {
  if (!Array.isArray(readings) || readings.length === 0) {
    return null;
  }

  return readings[readings.length - 1]?.value ?? null;
};

function Reading({ icon, label, value, unit }) {
  return (
    <div className="rounded-xl bg-[#F5F8F3] p-4">
      <div className="flex items-center gap-2 text-[#548164]">
        {icon}
        <span className="text-xs text-[#718375]">{label}</span>
      </div>

      <p className="mt-4 text-2xl font-semibold text-[#244D3A]">
        {value ?? "—"}
        <span className="ml-1 text-sm font-normal text-[#718375]">
          {value == null ? "" : unit}
        </span>
      </p>
    </div>
  );
}

export function Cards({ channels = [] }) {
  const navigate = useNavigate();
  const thresholds = useFarmThresholds();


  return (
<div className="grid gap-5 2xl:grid-cols-3">      {channels.map((channel, index) => {
        const temperature = latest(channel.fieldValue1);
        const humidity = latest(channel.fieldValue2);
        const moisture = latest(channel.fieldValue3);
        const health = getChannelHealth(channel, thresholds);

        return (
          <article
            key={channel.id || channel._id || index}
            className="rounded-2xl border border-[#E1E8DE] bg-white p-6 shadow-sm"
          >
            <div className="mb-6 flex items-start justify-between gap-3">
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[#548164]">
                  Farming channel {String(index + 1).padStart(2, "0")}
                </p>

                <h3 className="font-serif text-2xl text-[#244D3A]">
                  {channel.name || "Unnamed channel"}
                </h3>
                
<span
  className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
    health.status === "attention"
      ? "bg-amber-100 text-amber-800"
      : health.status === "incomplete"
      ? "bg-gray-100 text-gray-700"
      : "bg-[#E3F0E2] text-[#326547]"
  }`}
>
  {health.status === "attention"
    ? `${health.alerts.length} reading(s) need review`
    : health.status === "incomplete"
    ? "Incomplete readings"
    : "Within demo ranges"}
</span>

              </div>

              <button
                type="button"
                aria-label={`View ${channel.name || "channel"} details`}
                onClick={() =>
                  navigate("/carddetail", {
                    state: { channel },
                  })
                }
                className="rounded-xl bg-[#E9F1E8] p-3 text-[#326547] transition-colors hover:bg-[#D5E7D2]"
              >
                <FiArrowUpRight size={20} />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <Reading
                icon={<FiThermometer />}
                label={channel.fieldName1 || "Temperature"}
                value={temperature}
                unit="°C"
              />

              <Reading
                icon={<FiDroplet />}
                label={channel.fieldName2 || "Humidity"}
                value={humidity}
                unit="%"
              />

              <Reading
                icon={<FiActivity />}
                label={channel.fieldName3 || "Soil Moisture"}
                value={moisture}
                unit=""
              />
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/carddetail", {
                  state: { channel },
                })
              }
              className="mt-6 flex items-center gap-2 text-sm font-medium text-[#326547] hover:underline"
            >
              View channel details
              <FiArrowUpRight />
            </button>
          </article>
        );
      })}
    </div>
  );
}


// import React, { useState, useEffect } from "react";
// import { FiMoreHorizontal } from "react-icons/fi";
// import { Button } from "./Button";
// import { useNavigate } from "react-router-dom";
// import { TbTemperatureCelsius } from "react-icons/tb";
// import { WiHumidity } from "react-icons/wi";
// import { BsMoisture } from "react-icons/bs";

// export const Cards = ({ channels }) => {
//   let navigate = useNavigate();
//   const [tempIndicator, setTempIndicator] = useState("");
//   const [moistIndicator, setMoistIndicator] = useState("");
//   const [humidIndicator, setHumidIndicator] = useState("");
//   const [tempTextColor, setTempTextColor] = useState("");
//   const [humidTextColor, setHumidTextColor] = useState("");
//   const [moistTextColor, setMoistTextColor] = useState("");

//   useEffect(() => {
//     channels?.map((res, i) => {
//       const f1 = res?.fieldValue1;
//       const f2 = res?.fieldValue2;
//       const f3 = res?.fieldValue3;
//       // last temp value
//       const lastVal1 = f1[f1.length - 1].value;

//       // last humidity value
//       const lastVal2 = f2[f2.length - 1].value;

//       // last moisture value
//       const lastVal3 = f3[f3.length - 1].value;

//       // if temperature value greater than 30, temperature is high, set text color red
//       if (lastVal1 >= 30) {
//         setTempIndicator("high");
//         setTempTextColor("text-red-600");
//       } else if (lastVal1 <= 15) {
//         setTempIndicator("low");
//         setTempTextColor("text-blue-400");
//       } else {
//         setTempIndicator("moderate");
//         setTempTextColor("text-yellow-400");
//       }
//       if (lastVal2 >= 65) {
//         setHumidIndicator("humid");
//         setHumidTextColor("text-blue-600");
//       } else if (lastVal2 > 55 && lastVal2 < 65) {
//         setHumidIndicator("dry");
//         setHumidTextColor("text-pink-200");
//       } else {
//         setHumidIndicator("sticky");
//         setHumidTextColor("text-yellow-400");
//       }
//       if (lastVal3 >= 750) {
//         setMoistIndicator("dry");
//         setMoistTextColor("text-pink-400");
//       } else if (lastVal3 > 500 && lastVal3 < 750) {
//         setMoistIndicator("moderate");
//         setMoistTextColor("text-yellow-400");
//       } else {
//         setMoistIndicator("wet");
//         setMoistTextColor("text-blue-400");
//       }
//     });
//   }, [channels]);

//   const navCardDetail = (e, channel) => {
//     e.preventDefault();
//     navigate("/carddetail", { state: { channel } });
//   };
//   return (
//     <div className="flex flex-col  items-start  gap-y-9 ">
//       {channels?.map((channel, i) => {
//         const item1 = channel?.fieldValue1;
//         const item2 = channel?.fieldValue2;
//         const item3 = channel?.fieldValue3;

//         return (
//           <div
//             key={i}
//             className="bg-buttonColor p-6 flex flex-col gap-y-5 rounded-lg w-full"
//           >
//             <div className="flex items-center justify-between">
//               <h1 className="font-bold text-textColor text-lg">
//                 {channel?.name}
//               </h1>
//               <Button
//                 icon={<FiMoreHorizontal />}
//                 textSize="text-base"
//                 color="bg-transparent"
//                 textColor="text-textColor"
//                 onClick={(e) => navCardDetail(e, channel)}
//               />
//             </div>
//             <div className="flex flex-col space-y-3 lg:flex-row gap-x-7">
//               <div className="bg-white flex flex-col  rounded-lg p-5 w-full">
//                 <div className="flex justify-between">
//                   <div className="flex items-center gap-x-2 text-red-600">
//                     <TbTemperatureCelsius />
//                     <h1 className="text-black">{channel?.fieldName1}</h1>
//                   </div>

//                   <span className={` ${tempTextColor}`}>{tempIndicator}</span>
//                 </div>
//                 <span
//                   key={i}
//                   className="font-bold text-3xl text-red-600 text-center"
//                 >
//                   {item1[item1.length - 1].value}
//                 </span>
//               </div>
//               <div className="bg-white flex flex-col  rounded-lg p-5 w-full">
//                 <div className="flex justify-between">
//                   <div className="flex items-center gap-x-2 text-blue-400">
//                     <WiHumidity />
//                     <h1 className="text-black">{channel?.fieldName2}</h1>
//                   </div>
//                   <span className={`${humidTextColor}`}>{humidIndicator}</span>
//                 </div>
//                 <span
//                   key={i}
//                   className="font-bold text-3xl text-blue-400 text-center"
//                 >
//                   {item2[item2.length - 1].value}
//                 </span>
//               </div>
//               <div className="bg-white flex flex-col  rounded-lg p-5 w-full">
//                 <div className="flex justify-between">
//                   <div className="flex items-center gap-x-2 text-blue-600">
//                     <BsMoisture />
//                     <h1 className="text-black">{channel?.fieldName3}</h1>
//                   </div>

//                   <span className={`${moistTextColor}`}>{moistIndicator}</span>
//                 </div>
//                 <span
//                   key={i}
//                   className="font-bold text-3xl text-blue-600 text-center"
//                 >
//                   {item3[item3.length - 1].value}
//                 </span>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
