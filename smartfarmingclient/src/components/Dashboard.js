import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Cards } from "./Cards";
import { Button } from "./Button";
import { AiOutlinePlus } from "react-icons/ai";
import { fetchRequests } from "../actions/request";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";
import { fetchChannels } from "../actions/channelActions";
import { logout } from "../actions/userActions";
import ModalNewChannel from "./ModalNewChannel";
import { toast } from "react-toastify";
import { Loadingpage } from "./Loadingpage";
import ScreenTitles from "./ScreenTitles";
// const MapWithAMarker = withScriptjs(withGoogleMap(props =>
//   <GoogleMap
//     defaultZoom={8}
//     defaultCenter={{ lat: -34.397, lng: 150.644 }}
//   >
//     <Marker
//       position={{ lat: 9.0438, lng: 38.7612 }}
//     />
//   </GoogleMap>
// ));

// import Iframe from "react-iframe";
// const mdTheme = createTheme();

// function useInterval(callback, delay) {
//   const savedCallback = useRef();

//   // Remember the latest callback.
//   useEffect(() => {
//     savedCallback.current = callback;
//   }, [callback]);

//   // Set up the interval.
//   useEffect(() => {
//     function tick() {
//       savedCallback.current();
//     }
//     if (delay !== null) {
//       let id = setInterval(tick, delay);
//       return () => clearInterval(id);
//     }
//   }, [delay]);
// }

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
  const { loading, channels, success } = useSelector(
    (state) => state.fetchChannels
  );
  const dispatch = useDispatch();

  useEffect(() => {
    //JWT check if token expired
    if (user) {
      const decodedToken = jwtDecode(user.token);
      if (decodedToken.exp * 1000 < Date.now()) {
        toast.configure();
        toast.warn("Session expired. Login again", {
          position: "top-center",
          autoClose: 5000,
          pauseOnHover: false,
          hideProgressBar: true,
        });
        dispatch(logout(navigate));
      }
    }
  }, [location, dispatch, user]);

  // fetch all channels from DB
  useEffect(() => {
    dispatch(fetchChannels());
  }, [location, dispatch]);

  return (
    <>
      <div className="flex bg-gray-100">
        <Sidebar />
        <div className="p-2 flex-1  h-screen overflow-y-auto">
          <ScreenTitles title="Dashboard" />

          {loading && <Loadingpage />}
          <div className="my-5 p-5 bg-white rounded-md">
            <Cards channels={channels} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
