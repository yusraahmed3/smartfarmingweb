import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import AvatarImg from "../images/avatar.png";
import "./ManageAccount.css";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SecurityIcon from "@material-ui/icons/Security";
import SimCardIcon from "@material-ui/icons/SimCard";
import EditIcon from '@material-ui/icons/Edit';
import { Component } from "react";
import { Input, InputAdornment } from "@material-ui/core";

function ManageAccount (){


  const json = localStorage.getItem("admin");
  const userID = JSON.parse(json);

  return (
    <>
      <Sidebar />
      <div className="position">
        <div className="pagetitle">
          <h3>Manage Accounts</h3>
        </div>
        <div className="scrollerview">
          <div className="avatar">
            <img src={AvatarImg} alt="anime" />
            <div>
              <button className="propicbutton">
                <AddAPhotoIcon className="picicon" /> Set profile picture
              </button>
            </div>
          </div>
          <hr />
          <div className="wrapperelement" >
            <form className="editform">
              <Input value={userID.name} className="inputfield" endAdornment={<InputAdornment position="end"><EditIcon/></InputAdornment>}/>
              <Input value={userID.phoneno} className="inputfield" endAdornment={<InputAdornment position="end"><EditIcon/></InputAdornment>}/>
              <Input value={userID.email} className="inputfield" endAdornment={<InputAdornment position="end"><EditIcon/></InputAdornment>}/>
            
              {/* <input value="something for now" className="inputfield" />
              <input value="something for now" className="inputfield"/>
              <input value="something for now" className="inputfield"/> */}
            </form>
          </div>
        </div>
      </div>
      {/* <div className="menudiv">
                <ul className="menulist">
                    <li className="listitem">
                   <Link to="/accountsettings"><div className="icon"> <AccountCircleIcon /></div><div className="title">Account Settings</div></Link> 
                    </li>
                    <li className="listitem">
                    <div className="icon"> <SecurityIcon /></div><div className="title">Security</div>
                    </li>
                    <li className="listitem">
                       <div className="icon"> <SimCardIcon /></div><div className="title">Change number</div>
                    </li>
                </ul>
            </div> */}
    </>
  );
        }


export default ManageAccount;
