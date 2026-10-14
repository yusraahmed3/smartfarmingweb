
import React from "react";
import {
  MdDashboard,
  MdAccountCircle,
  MdSettings,
} from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

import { isDemoMode } from "../demoMode";

const mainMenu = [
  {
    title: "Dashboard",
    icon: <MdDashboard />,
    link: "/dashboard",
  },
  {
    title: "Farm Settings",
    icon: <MdSettings />,
    link: "/settings",
  },
  {
    title: "Account",
    icon: <MdAccountCircle />,
    link: "/account",
  },
];

const adminOnlyMenu = [
  {
    title: "Requests",
    icon: <FiActivity />,
    link: "/active",
    gap: true,
  },
  {
    title: "Reviewed",
    icon: <BsFillCheckSquareFill />,
    link: "/reviewed",
  },
];

const exitItem = {
  title: isDemoMode ? "Exit preview" : "Log out",
  icon: <BiLogOut />,
  link: "/",
  last: true,
  gap: true,
};

export const AdminSidebarData = [
  ...mainMenu,
  ...(!isDemoMode ? adminOnlyMenu : []),
  exitItem,
];

export const UserSidebarData = [
  ...mainMenu,
  exitItem,
];
