import React, { Component } from "react";
import Navbar from "./Navbar";
import "./Request.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

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
      // idimg: props.idimg,
      loading: true,
    };

    this.handleButtonClick = this.handleButtonClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const url = 'http://localhost:4000/requests';
    const data = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phoneno: this.state.phoneno,
      instname: this.state.instname,
      email: this.state.email,
      password: this.state.password,
      message: this.state.message
    };

    axios({
        method: 'post',
        url: url,
        data: {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            phoneno: this.state.phoneno,
            instname: this.state.instname,
            email: this.state.email,
            password: this.state.password,
            message: this.state.message
        }
    })
    .then((response) => {
        alert("Request sent! We'll get back to you asap.")
        console.log(response);
      }, (error) => {
        console.log(error);
      });

//     fetch(url, {
//       method: "POST",

//       body: json(data), // data can be `string` or {object}!

//       headers: { "Content-Type": "application/json" },
//     })
//       .then((res) => res.json())

//       .catch((error) => console.error("Error:", error))

//       .then((response) => console.log("Success:", response));
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

  handleButtonClick() {
    console.log(this.state.firstname);
  }

  render() {
    return (
      <div>
        <Navbar />
        <h3 className="reqtitle">Send us a request</h3>
        <div className="wrapper">
          <form className="formdiv" onSubmit={this.handleSubmit}>
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
              <input type="file" />
              <button
                className="reqbutton"
                type="submit"
                onClick={this.handleButtonClick.bind(this)}
              >
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
