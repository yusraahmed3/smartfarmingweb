import React, { Component } from "react";
import Navbar from "./Navbar";
import "./Request.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: props.firstname,
      lastname: props.lastname,
      phoneno: props.phoneno,
      instname: props.instname,
      email: props.email,
      password: props.password,
      message: props.message,
      idimg: "",
      loading: true,
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("firstname", this.state.firstname);
    formData.append("lastname", this.state.lastname);
    formData.append("phoneno", this.state.phoneno);
    formData.append("instname", this.state.instname);
    formData.append("email", this.state.email);
    formData.append("password", this.state.password);
    formData.append("message", this.state.message);
    formData.append("idimg", this.state.idimg);
    const url = "http://localhost:4000/requests";
    axios({
      method: "post",
      url: url,
      data: formData,
    }).then(
      (response) => {
        toast.configure();
        toast.success("Request sent", {
          position: "top-center",
          autoClose: 5000,
          pauseOnHover: true,
          hideProgressBar: true,
        });
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

    //     fetch(url, {
    //       method: "POST",

    //       body: json(data), // data can be `string` or {object}!

    //       headers: { "Content-Type": "application/json" },
    //     })
    //       .then((res) => res.json())

    //       .catch((error) => console.error("Error:", error))

    //       .then((response) => console.log("Success:", response));
  }

  handleFileChange(event) {
    var filename = this.state.idimg;
    filename = event.target.files[0];
    console.log(filename);
    this.setState({ idimg: filename });
  }

  handleFirstNameChanged(event) {
    var firstname = this.state.firstname;
    firstname = event.target.value;

    this.setState({ firstname: firstname });
  }

  handleLastNameChanged(event) {
    var lastname = this.state.lastname;
    lastname = event.target.value;

    this.setState({ lastname: lastname });
  }

  handlePhoneNoChanged(event) {
    var phoneno = this.state.phoneno;
    phoneno = event.target.value;

    this.setState({ phoneno: phoneno });
  }

  handleInstNameChanged(event) {
    var instname = this.state.instname;
    instname = event.target.value;

    this.setState({ instname: instname });
  }

  handleEmailChanged(event) {
    var email = this.state.email;
    email = event.target.value;

    this.setState({ email: email });
  }

  handlePasswordChanged(event) {
    var password = this.state.password;
    password = event.target.value;

    this.setState({ password: password });
  }

  handleMessageChanged(event) {
    var message = this.state.message;
    message = event.target.value;

    this.setState({ message: message });
  }

  handleButtonClick = () => {};

  render() {
    return (
      <div>
        <Navbar />
        <h3 className="reqtitle">Send us a request</h3>
        <div className="wrapper">
          <form
            className="formdiv"
            onSubmit={this.handleSubmit}
            method="post"
            encType="multipart/form-data"
          >
            <div className="formControl">
              <input
                type="text"
                placeholder="First Name"
                value={this.state.firstname || ""}
                onChange={this.handleFirstNameChanged.bind(this)}
                className="fieldcss2"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={this.state.lastname || ""}
                onChange={this.handleLastNameChanged.bind(this)}
                className="fieldcss2"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={this.state.phoneno || ""}
                onChange={this.handlePhoneNoChanged.bind(this)}
                className="fieldcss2"
              />
              <input
                type="text"
                placeholder="Institution Name"
                value={this.state.instname || ""}
                onChange={this.handleInstNameChanged.bind(this)}
                className="fieldcss2"
              />
              <input
                type="email"
                placeholder="Email"
                value={this.state.email || ""}
                onChange={this.handleEmailChanged.bind(this)}
                className="fieldcss2"
              />
            </div>

            <div className="formControl2">
              <input
                type="password"
                placeholder="Password"
                value={this.state.password || ""}
                onChange={this.handlePasswordChanged.bind(this)}
                className="fieldcss2"
              />
              <input
                type="password"
                placeholder="Confirm password"
                className="fieldcss2"
              />
              <textarea
                placeholder="Describe your purpose"
                value={this.state.message || ""}
                onChange={this.handleMessageChanged.bind(this)}
                className="fieldcss2"
              />
              <label>Upload a clear view of your ID</label>
              <input
              type="file"
                name="image"
                accept="image/*"
                multiple={false}
                onChange={this.handleFileChange.bind(this)}
              />
              <button className="reqbutton" type="submit">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Request;
