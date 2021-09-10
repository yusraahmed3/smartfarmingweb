import React, { useLayoutEffect, useState } from "react";
import UserSidebar from "./UserSidebar";
import "./User.css";
import SearchBar from "./SearchBar";
import Cards from "./Cards";
import axios from "axios";

function User() {
  const [image, setImage] = useState("");

  useLayoutEffect(() => {
    axios({
      url: "http://localhost:4000/users/user",
      method: "get",
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => {
        console.log(res.data.user.idimg);
        setImage(res.data.user.idimg);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <UserSidebar image={image} />
      <div className="position">
        <div className="pagetitle">
          <h3>Dashboard</h3>
        </div>
        <SearchBar />
        <br />
        <br />
        <Cards
          location="Location 1"
          temperature="57"
          humidity="27"
          moisture="09"
        />
        <Cards
          location="Location 2"
          temperature="31.5"
          humidity="20"
          moisture="12"
        />
      </div>
    </>
  );
}

export default User;
