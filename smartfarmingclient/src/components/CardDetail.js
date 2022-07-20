import React, { useLayoutEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";
import LineChart from "./LineChart";
import ScreenTitles from "./ScreenTitles";

function CardDetail() {
  const location = useLocation();
  const { channel } = location.state;

  // change date from api to readable format in hours and minutes
  function toDate(secs) {
    var d = new Date();
    d.setTime(secs * 1000);
    var time = d.getHours() + ":" + d.getMinutes();
    return time;
  }

  // set temperature readings in a line chart
  const tempReadings = {
    labels: channel?.fieldValue1.map((data) => toDate(data.date)),
    datasets: [
      {
        label: "Temperature",
        data: channel?.fieldValue1.map((data) => data.value),
        fill: false,
        borderColor: "#15616D",
      },
    ],
  };

  // set humidity readings in a line chart
  const humidReadings = {
    labels: channel?.fieldValue2.map((data) => toDate(data.date)),
    datasets: [
      {
        label: "Humidity",
        data: channel?.fieldValue2.map((data) => data.value),
        fill: false,
        borderColor: "#15616D",
      },
    ],
  };

  // set moisture readings in a line chart
  const moistReadings = {
    labels: channel?.fieldValue3.map((data) => toDate(data.date)),
    datasets: [
      {
        label: "Moisture",
        data: channel?.fieldValue3.map((data) => data.value),
        fill: false,
        borderColor: "#15616D",
      },
    ],
  };

  return (
    <div className="flex bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-2 h-screen overflow-y-auto">
        <ScreenTitles title={channel.name} />

        <div className="flex flex-col gap-y-5 items-center w-full  mt-4">
          <div className="flex flex-col lg:flex-row w-full bg-white p-2 rounded-lg h-full">
            <div className="flex flex-col gap-y-5 items-center justify-center rounded-lg p-5 w-1/2 mx-auto">
              <h1 className="text-lg font-bold">{channel?.fieldName1}</h1>
              {channel?.fieldValue1.map((m, i, arr) => {
                return (
                  arr.length - 1 === i && (
                    <span
                      key={i}
                      className="font-bold text-3xl md:text-4xl text-red-600"
                    >
                      {m.value}
                    </span>
                  )
                );
              })}
            </div>
            <div className="w-full h-1/4">
              <LineChart channelValues={tempReadings} />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row  bg-white p-2 rounded-lg w-full">
            <div className=" flex flex-col gap-y-5 rounded-lg items-center justify-center p-5 w-1/2 mx-auto">
              <h1 className="text-lg font-bold">{channel?.fieldName2}</h1>
              {channel?.fieldValue2.map((m, i, arr) => {
                return (
                  arr.length - 1 === i && (
                    <span
                      key={i}
                      className="font-bold text-3xl md:text-4xl text-blue-400  "
                    >
                      {m.value}
                    </span>
                  )
                );
              })}
            </div>
            <div className="w-full">
              <LineChart channelValues={humidReadings} />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row bg-white p-2 rounded-lg w-full">
            <div className=" flex flex-col gap-y-5 rounded-lg items-center justify-center p-5 w-1/2 mx-auto">
              <h1 className="text-lg font-bold">{channel?.fieldName3}</h1>
              {channel?.fieldValue3.map((m, i, arr) => {
                return (
                  arr.length - 1 === i && (
                    <span
                      key={i}
                      className="font-bold text-3xl md:text-4xl text-blue-600"
                    >
                      {m.value}
                    </span>
                  )
                );
              })}
            </div>
            <div className="w-full">
              <LineChart channelValues={moistReadings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CardDetail;
