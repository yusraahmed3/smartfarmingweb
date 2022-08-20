import React from "react";

function ScreenTitles({ title }) {
  return (
    <h1 className="text-xl md:text-2xl text-center lg:text-start font-bold bg-white p-7 md:p-10 rounded-md">
      {title}
    </h1>
  );
}

export default ScreenTitles;
