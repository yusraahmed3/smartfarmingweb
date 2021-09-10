import React, { useLayoutEffect, useState } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";
import "./LoginForm.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import ValidationError from "./ValidationError";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
          : history.push("/userDash")
        })
        .catch((err) => console.log(err));
      // const data = await JSON.parse(res)
      // localStorage.setItem("token", data.token)
      // setErrorMessage(data.message)
      // console.log(data.token)

      // fetch('http://localhost:4000/users/login', {
      //   method: 'post',
      //   headers: {

      //   },
      //   body: JSON.stringify(user)
      // })
      // const data = await res.json()
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

  // .then((response) => {
  //   console.log(response);
  //   if (response.status === 200) {
  //     const roles  = response.data.result;
  //     console.log(roles)
  //     console.log(roles.role)
  //     if( roles.role === "admin") {
  //       console.log(roles.id)
  //       const json = JSON.stringify(roles)
  //       localStorage.setItem('admin', json)
  //       console.log("Youu are logged in");
  //       window.location = "/adminDash";
  //       history.push("/adminDash")
  //     }
  //     else{
  //       const jsonn = JSON.stringify(roles)
  //       localStorage.setItem('user', jsonn)
  //       console.log("You are inside user role")
  //      window.location = "userDash"
  //       history.push("/userDash");
  //     }
  //   } else if (response.status === 404 || response.status === 403) {
  //     console.log("Unauthorized")
  //   }

  // })

  // useLayoutEffect(() => {
  //   axios({
  //     url: "http://localhost:4000/users/isUserAuth",
  //     method: "get",
  //     headers: {
  //       "x-access-token": localStorage.getItem("token"),
  //     },
  //   }).then(res =>{
  //     console.log(res)
  //     setIsLoggedIn(res.isLoggedIn);
  //       console.log(res.isLoggedIn);
  //       console.log(res.role);
  //       setRole(res.role);
  //   }).catch(err=>console.log)
  // }, [history])

  // useEffect(() => {
  //   fetch('http://localhost:4000/users/isUserAuth', {
  //     headers: {
  //       "x-access-token": localStorage.getItem("token")
  //     }
  //   })
  //   .then(res=> res.json())
  //   .then(data => data.isLoggedIn ? data.role === "admin" ? history.push('/adminDash') : history.push('/userDash'): null)
  //   .catch(err => console.log(err))
  // axios
  //   .get("http://localhost:4000/users/isUserAuth", {
  //     headers: {
  //       "x-access-token": localStorage.getItem("token"),
  //     },
  //   }).then(res => console.log(res))
  //   .then((data) => {return data.isLoggedIn ? data.role ==="admin"
  //     ? history.push("/adminDash") : history.push('/userDash')
  //   : null})
  //   .catch((err) => console.log(err));
  // }, [history]);
  return (
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
          <br />
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
      {isLoggedIn ? (
        role === "admin" ? (
          <Redirect to="/adminDash" />
        ) : (
          <Redirect to="/userDash" />
        )
      ) : null}
      {/* {errorMessage === "Success" ? role  === "admin" ? <Redirect to="/adminDash"/> : <Redirect to ="/userDash" />: <ValidationError message={errorMessage}/>} */}
    </div>
  );
}

export default LoginForm;
