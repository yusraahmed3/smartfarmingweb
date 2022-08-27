import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchChannels } from "../redux/features/channelSlice";
import { Loadingpage } from "./Loadingpage";
import ScreenTitles from "./ScreenTitles";
import Sidebar from "./Sidebar";
import { Cards } from "./Cards";

function Dashboard() {
  const dispatch = useDispatch();
  const { loading, channels, success } = useSelector((state) => state.channel);

  // fetch all channels from DB
  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch, success]);

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
