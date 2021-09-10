import Avatar from "./Avatar";
import React from "react";
import "./Sidebar.css";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function UserSidebar(props) {
  const logout = () => {
    localStorage.clear()
    localStorage.removeItem("token");
    window.location.pathname = "/";
  };

  return (
    <div className="sidebar">
      <Avatar imageAvatar={props.image} />
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
      </ul>
    </div>
  );
}

export default UserSidebar;
