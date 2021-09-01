import Avatar from "./Avatar";
import React from "react";
import "./Sidebar.css";
import { UserSidebarData } from "./UserSidebarData";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function UserSidebar() {
  const logout = () => {
    localStorage.clear();
    window.location.pathname = "/";
  };

  return (
    <div className="sidebar">
      <Avatar />
      <hr className="linesep" />
      <ul className="sidebarlist">
        <li
          className="row"
          id={window.location.pathname === "/userDash" ? "active" : ""}
          onClick={() => {
            window.location.pathname = "/userDash";
          }}
        >
          <div id="icon">
            <DashboardIcon />
          </div>
          <div id="title">Dashboard</div>
        </li>
        <li
          className="row"
          id={window.location.pathname === "/userAccount" ? "active" : ""}
          onClick={() => {
            window.location.pathname = "/userAccount";
          }}
        >
          <div id="icon">
            <AccountBoxIcon />
          </div>
          <div id="title">Manage account</div>
        </li>
        <li
          className="row"
          id={window.location.pathname === "/" ? "active" : ""}
          onClick={logout}
        >
          <div id="icon">
            <ExitToAppIcon />
          </div>
          <div id="title">Log out</div>
        </li>
        {/* {UserSidebarData.map((val, key) => {
          return (
            <li
              key={key}
              onClick={() => {
                window.location.pathname = val.link;
              }}
              id={window.location.pathname === val.link ? "active" : ""}
              className="row"
            >
              <div id="icon">{val.icon}</div>
              <div id="title">{val.title}</div>
            </li>
          );
        })} */}
      </ul>
    </div>
  );
}

export default UserSidebar;
