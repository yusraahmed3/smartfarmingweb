import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import "./ManageAccount.css";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import { Input, InputAdornment } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function ManageAccount() {
  const json = localStorage.getItem("admin");
  const userID = JSON.parse(json);
  const inputRef = useRef()
  const inputField = useRef(null);
  const [name, setName] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [editMode, setEditMode] = useState(false);

  // useEffect(() => {
  //   onUpdateName()
  // }, )

  const handleImageFile = (e) => {
    // console.log(e.target.files, "$$$$")
    // console.log(e.target.files[0], "$$$$")
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
    // var file = e.target.files[0];
    // console.log(file)
    // setImage(file);
  };

  const renderEditView = () => {
    return (
      <div className="inputfield">
        <input ref={inputRef} type="text" defaultValue={name}/>
        <button onClick={changeEditMode}>X</button>
        <button onClick={updateComponentValue.bind(this)}>OK</button>
      </div>
    );
  };

  const updateComponentValue = () => {
    setEditMode(false);
    setName(inputRef.current.value);
    onUpdateName()
  };

  const onUpdateName = () => {
    console.log(name)
    const url = `http://localhost:4000/users/updatename/${userID.id}`;
    axios.patch(url, name).then(res=>{console.log(res.data)})
  }

  const renderDefaultView = () => {
    return (
      <div className="inputfield" onDoubleClick={changeEditMode}>
        {name ? name : userID.name}hey
        {/* <button onClick={changeEditMode}>Edit</button> */}
      </div>
    );
  };

  const handleUpload = (e) => {
    e.preventDefault();
    var fd = new FormData();
    fd.append("idimg", image.raw);
    console.log(image);
    const url = `http://localhost:4000/users/photo/${userID.id}`;
    console.log(userID.id);
    axios
      .patch(url, fd)
      .then((res) => {
        console.log(res.data.idimg);
      })
      .then(() => {
        toast.configure();
        toast.success("Uploaded Successfully", {
          position: "top-center",
          autoClose: 5000,
          pauseOnHover: true,
          hideProgressBar: true,
        });
      });
    // console.log("image now "+ image)
    //console.log(image);
  };

  const changeEditMode = () => {
    setEditMode(!editMode);
  };

  const handleNameChange = () => {
    inputField.current.focus();
  };

  const handlePhoneNoChange = () => {};

  const handleEmailChange = () => {};

  return (
    <>
      <Sidebar image={image.preview ? image.preview : userID.idimg} />
      <div className="position">
        <div className="pagetitle">
          <h3>Manage Accounts</h3>
        </div>
        <div className="avatarwrapper">
          <div className="boxed">
            {/* <AccountCircleIcon src={userID.idimg}/> */}
            <img
              className="avatar"
              src={image.preview ? image.preview : userID.idimg}
              alt="anime"
            />
          </div>
          <div>
            <input
              type="file"
              name="image"
              accept="image/*"
              multiple={false}
              onChange={handleImageFile.bind(this)}
            />
            <button className="propicbutton" onClick={handleUpload.bind(this)}>
              Upload
            </button>
          </div>
        </div>
        <hr />
        <div className="wrapperelement">
          <form className="editform">
            <div className="group-control">
              <label>Name </label>
              {/* <Input
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
              /> */}
              {editMode ? renderEditView() : renderDefaultView()}
            </div>
            <div className="group-control">
              <label>Phone number </label>
              {/* <Input
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
              /> */}
              <div className="inputfield">{userID.phoneno}</div>
            </div>
            <div className="group-control">
              <label>Email </label>
              {/* <Input
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
              /> */}
              <div className="inputfield">{userID.email}</div>
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
