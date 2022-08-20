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
// <>
//   <Sidebar name={location.state.location}>
//     <Box style={{top: "80px", position: "relative"}}>
//     <Container>
//       <Card style={{ backgroundColor: "#f8f9fa", marginBottom: "20px" }}>
//         <Toolbar
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "flex-end",
//             px: [1],
//           }}
//         >
//           <Typography variant="h5" component="h2">
//             {location.state.location}
//           </Typography>
//         </Toolbar>
//         <CardContent>
//           <Grid container spacing={3}>
//             <Grid item xs={4}>
//               <Paper>
//                 <Toolbar
//                   sx={{
//                     display: "flex",
//                     px: [1],
//                   }}
//                 >
//                   <WiThermometer size={35} color="#d00000" />
//                   Temperature

//                 </Toolbar>
//                 <Typography
//                   variant="h3"
//                   style={{ color: "#d00", textAlign: "center" }}
//                   noWrap
//                 >
//                   {location.state.temperature}
//                 </Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={4}>
//               <Paper>
//                 <Toolbar
//                   sx={{
//                     display: "flex",

//                     px: [1],
//                   }}
//                 >
//                   <WiRaindrops size={35} color="#0077b6" />
//                   Moisture
//                 </Toolbar>
//                 <Typography
//                   variant="h3"
//                   style={{ color: "#4cc9f0", textAlign: "center" }}
//                 >
//                   {location.state.moisture}
//                 </Typography>
//               </Paper>
//             </Grid>
//             <Grid item xs={4}>
//               <Paper>
//                 <WiHumidity size={35} color="#023e8a" />
//                 Humidity
//                 <Typography
//                   variant="h3"
//                   style={{ color: "#0077b6", textAlign: "center" }}
//                 >
//                   {location.state.humidity}
//                 </Typography>
//               </Paper>
//             </Grid>
//           </Grid>
//         </CardContent>
//       </Card>
//     </Container>
//     <Charts channelname={location.state.location} />
{
  /* <div className="pagetitle">
            <h3>Location 1</h3>
          </div>
          <div className="cards">
            <div className="card">
              <div className="card__icon">
                {" "}
                <WiThermometer size={35} color="#d00000" />
              </div>
              <div className="card__title">Temperature</div>
              <div className="card__content">{location.state.temperature}</div>
            </div>
            <div className="card">
              <div className="card__icon">
                <WiRaindrops size={35} color="#0077b6" />
              </div>
              <div className="card__title">Moisture</div>
              <div className="card__content">{location.state.moisture}</div>
            </div>
            <div className="card">
              <div className="card__icon">
                {" "}
                <WiHumidity size={35} color="#023e8a" />
              </div>
              <div className="card__title">Humidity</div>
              <div className="card__content">{location.state.humidity}</div>
            </div>
          </div>
           */
}

{
  /* <Box
          p={10}
            sx={{
              height: '25%',
            }}
            style={{
              height: '5%'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Charts />
              </Grid>
              <Grid item xs={4}>
                <Charts />
              </Grid>
              <Grid item xs={4}>
                <Charts />
              </Grid>
            </Grid>
          </Box> */
}
//       </Box>
//   </Sidebar>
// </>

export default CardDetail;
