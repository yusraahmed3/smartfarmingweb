import React from "react";
import AvatarImg from "../images/avatar.png";
import Sidebar from "./Sidebar";
import './AccountDetail.css'

function AccountDetail() {
  return (
    <div>
      <Sidebar />
      <div className="wrap">
        <div className="avatar">
          <img src={AvatarImg} alt="anime" />
        </div>
      </div>
    </div>
  );
}

export default AccountDetail;
