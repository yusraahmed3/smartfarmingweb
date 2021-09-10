import React, {  useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./LoginForm.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Footer from "./footer";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function login(event) {
    event.preventDefault();
    const user = {
      email: email,
      password: password,
    };

    console.log("Inside log in");
    const url = "http://localhost:4000/users/login";
    try {
      await axios({
        url: url,
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        data: user,
      })
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          res.data.role === "admin"
            ? history.push("/adminDash")
            : history.push("/userDash");
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
      toast.configure();
      toast.error("Username/password incorrect!", {
        position: "top-center",
        autoClose: 5000,
        pauseOnHover: true,
        hideProgressBar: true,
      });
    }
  }

  return (
    <>
    <div className="loginDiv">
      <div className="childCont">
        <form className="login-form">
          <input
            type="text"
            placeholder="Email"
            className="fieldcss"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <br />
          <input
            type="password"
            placeholder="Password"
            className="fieldcss"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="forgotstyle">
            Forgot password?
            </div>
          <br />
          <button type="submit" className="button-primary" onClick={login}>
            Login
          </button>
          <br />
          <br />
          <Link to="/request">
            <button
              className="button-outline"
              onClick={() => console.log("button clicked")}
            >
              Request Data
            </button>
          </Link>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default LoginForm;
