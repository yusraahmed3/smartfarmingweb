import React, { useRef, useState } from "react";
import Sidebar from "./Sidebar";
import AvatarImg from "../images/avatar.png";
import "./ManageAccount.css";
import axios from "axios";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import EditIcon from "@material-ui/icons/Edit";
import { Input, InputAdornment } from "@material-ui/core";

function ManageAccount() {
  const inputField = useRef(null);
  // const [name, setName] = useState("");
  // const [phoneno, setPhoneno] = useState("");
  // const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const json = localStorage.getItem("admin");
  const userID = JSON.parse(json);

  const handleImageFile = (e) => {
    // console.log(e.target.files, "$$$$")
    // console.log(e.target.files[0], "$$$$")
    let file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = (e) => {
    console.log(image);
  };

  const handleNameChange = () => {
    inputField.current.focus();
  };

  const handlePhoneNoChange = () => {};

  const handleEmailChange = () => {};

  return (
    <>
      <Sidebar />
      <div className="position">
        <div className="pagetitle">
          <h3>Manage Accounts</h3>
        </div>
          <div className="avatar">
            <img src={userID.idimg} alt="anime" />
            <div>
              <input
                type="file"
                className="propicbutton"
                onChange={(e) => handleImageFile(e)}
                onClick={(e) => handleUpload(e)}
              />
            </div>
          </div>
          <hr />
          <div className="wrapperelement">
            <form className="editform">
              <div className="group-control">
                <label>Name </label>
                <Input
                  value={userID.name}
                  ref={inputField}
                  className="inputfield"
                  endAdornment={
                    <InputAdornment position="end">
                      <button
                        className="editiconbutton"
                        onClick={handleNameChange}
                      >
                        <EditIcon />
                      </button>
                    </InputAdornment>
                  }
                />
              </div>
              <div className="group-control">
                <label>Phone number </label>
                <Input
                  value={userID.phoneno}
                  onChange={handlePhoneNoChange}
                  className="inputfield"
                  endAdornment={
                    <InputAdornment position="end">
                      <button className="editiconbutton">
                        <EditIcon />
                      </button>
                    </InputAdornment>
                  }
                />
              </div>
              <div className="group-control">
                <label>Email </label>
                <Input
                  value={userID.email}
                  onChange={handleEmailChange}
                  className="inputfield"
                  endAdornment={
                    <InputAdornment position="end">
                      <button className="editiconbutton">
                        <EditIcon />
                      </button>
                    </InputAdornment>
                  }
                />
                </div>
                {/* <br/>
                <div className="group-control"></div>
                <div className="idimgdiv">
                  <span>ID </span>
                  <img src={userID.idimg} alt="some" className="idimgcss" />
                </div>
              </div> */}
              {/* <input value="something for now" className="inputfield" />
              <input value="something for now" className="inputfield"/>
              <input value="something for now" className="inputfield"/> */}
            </form>
          </div>
        </div>
    </>
  );
}

export default ManageAccount;
