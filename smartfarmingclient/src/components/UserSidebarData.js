import React from 'react'
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export const UserSidebarData = [{
    title: "Dashboard",
    icon: <DashboardIcon/>,
    link: "/adminDash"
},
{
    title: "Manage account",
    icon: <AccountBoxIcon/>,
    link: "/account"
},
{
    title: "Log out",
    icon: <ExitToAppIcon/>,
    link: "/"
},
]
