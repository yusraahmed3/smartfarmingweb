import React from "react";
import { MdDashboard, MdAccountCircle } from "react-icons/md";
import { FiActivity } from "react-icons/fi";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi";

export const AdminSidebarData = [
  {
    title: "Dashboard",
    icon: <MdDashboard />,
    link: "/dashboard",
  },
  {
    title: "Account ",
    icon: <MdAccountCircle />,
    link: "/account",
  },
  {
    title: "Requests ",
    icon: <FiActivity />,
    link: "/active",
    gap: true,
  },
  {
    title: "Reviewed ",
    icon: <BsFillCheckSquareFill />,
    link: "/reviewed",
  },
  {
    title: "Log out",
    icon: <BiLogOut />,
    link: "/",
    last: true,
    gap: true,
  },
];

export const UserSidebarData = [
  {
    title: "Dashboard",
    icon: <MdDashboard />,
    link: "/dashboard",
  },
  {
    title: "Account ",
    icon: <MdAccountCircle />,
    link: "/account",
    gap: true,
  },
  {
    title: "Log out",
    icon: <BiLogOut />,
    link: "/",
    last: true,
    gap: true,
  },
];
