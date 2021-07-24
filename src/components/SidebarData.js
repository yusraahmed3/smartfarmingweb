import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export const SidebarData = [{
    title: "Dashboard",
    icon: <DashboardIcon/>,
    link: "/dash"
},
{
    title: "Manage account",
    icon: <AccountBoxIcon/>,
    link: "/account"
},
{
    title: "Active requests",
    icon: <DashboardIcon/>,
    link: "/active"
},
{
    title: "Approved requests",
    icon: <ThumbUpIcon/>,
    link: "/approved"
},
{
    title: "Rejected requests",
    icon: <ThumbDownIcon/>,
    link: "/rejected"
},
{
    title: "Log out",
    icon: <ExitToAppIcon/>,
    link: "/"
},
]
