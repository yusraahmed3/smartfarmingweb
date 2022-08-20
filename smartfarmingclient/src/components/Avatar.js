import React from "react";
import Pic from "../assets/images/anime.jpg";

function Avatar({ size, image }) {
  return (
    <div className={`  ${size}`}>
      <img
        className="w-full h-full object-cover rounded-full"
        src={image}
        alt="anime"
      />
    </div>
  );
}

export default Avatar;
