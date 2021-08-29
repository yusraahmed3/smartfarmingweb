import React from 'react'
import Sidebar from './Sidebar'
import './ManageAccount.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SecurityIcon from '@material-ui/icons/Security';
import SimCardIcon from '@material-ui/icons/SimCard';

function ManageAccount() {
    return (
        <>
        <Sidebar/>
        <div className="position"> 
            <div className="pagetitle">
             <h3>Manage Accounts</h3>
            </div>
            <div className="menudiv">
                <ul className="menulist">
                    <li className="listitem">
                    <div className="icon"> <AccountCircleIcon /></div><div className="title">Account Settings</div>
                    </li>
                    <li className="listitem">
                    <div className="icon"> <SecurityIcon /></div><div className="title">Security</div>
                    </li>
                    <li className="listitem">
                       <div className="icon"> <SimCardIcon /></div><div className="title">Change number</div>
                    </li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default ManageAccount
