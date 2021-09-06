import React from 'react'
import AvatarImg from '../images/avatar.png'
import './Avatar.css'

function Avatar(props) {

    const json = localStorage.getItem("user");
  const userID = JSON.parse(json);
    return (
        <div className="boxedSidebar">
            <img className="avatarSidebar" src={props.imageAvatar} alt="anime"/>
        </div>
    )
}

export default Avatar
