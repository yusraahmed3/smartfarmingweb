import AvatarImg from "../images/avatar.png";
import React from "react";
import "./Sidebar.css";
import Avatar from './Avatar'
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function Sidebar(props) {
  const logout = () => {
    localStorage.clear();
    window.location.pathname = "/";
    console.log(localStorage.getItem("admin"))
  };

  return (
    <div className="sidebar">
      <Avatar imageAvatar={props.image} />
      <hr className="linesep" />
      <ul className="sidebarlist">
        <li
          className="row"
          id={window.location.pathname === "/adminDash" ? "active" : ""}
          onClick={() => {
            window.location.pathname = "/adminDash";
          }}
        >
          <div id="icon">
            <DashboardIcon />
          </div>
          <div id="title">Dashboard</div>
        </li>
        <li
          className="row"
          id={window.location.pathname === "/account" ? "active" : ""}
          onClick={() => {
            window.location.pathname = "/account";
          }}
        >
          <div id="icon">
            <AccountBoxIcon />
          </div>
          <div id="title">Manage account</div>
        </li>
        <li
          className="row"
          id={window.location.pathname === "/active" ? "active" : ""}
          onClick={() => {
            window.location.pathname = "/active";
          }}
        >
          <div id="icon">
            <DashboardIcon />
          </div>
          <div id="title">Active requests</div>
        </li>
        <li
          className="row"
          id={window.location.pathname === "/approved" ? "active" : ""}
          onClick={() => {
            window.location.pathname = "/approved";
          }}
        >
          <div id="icon">
            <ThumbUpIcon />
          </div>
          <div id="title">Approved requests</div>
        </li>
        <li
          className="row"
          id={window.location.pathname === "/rejected" ? "active" : ""}
          onClick={() => {
            window.location.pathname = "/rejected";
          }}
        >
          <div id="icon">
            <ThumbDownIcon />
          </div>
          <div id="title">Rejected requests</div>
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
        {/* {SidebarData.map((val, key) => {
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

export default Sidebar;
