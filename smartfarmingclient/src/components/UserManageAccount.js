import React from "react";
import AvatarImg from "../images/avatar.png";
import "./ManageAccount.css";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import EditIcon from "@material-ui/icons/Edit";
import { Input, InputAdornment } from "@material-ui/core";
import UserSidebar from "./UserSidebar";

function UserManageAccount() {
  const json = localStorage.getItem("user");
  const userID = JSON.parse(json);

  return (
    <>
      <UserSidebar />
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
          <div className="wrapperelement">
            <form className="editform">
              <Input
                value={userID.name}
                className="inputfield"
                endAdornment={
                  <InputAdornment position="end">
                    <EditIcon />
                  </InputAdornment>
                }
              />
              <Input
                value={userID.phoneno}
                className="inputfield"
                endAdornment={
                  <InputAdornment position="end">
                    <EditIcon />
                  </InputAdornment>
                }
              />
              <Input
                value={userID.email}
                className="inputfield"
                endAdornment={
                  <InputAdornment position="end">
                    <EditIcon />
                  </InputAdornment>
                }
              />
              {/* <input value="something for now" className="inputfield" />
              <input value="something for now" className="inputfield"/>
              <input value="something for now" className="inputfield"/> */}
              <div className="idimgdiv">
                <img src={userID.idimg} alt="some" className="idimgcss" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserManageAccount;
