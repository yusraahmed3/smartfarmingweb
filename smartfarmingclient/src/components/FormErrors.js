import React from "react";

function FormErrors({ errors }) {
  return <p className="text-sm text-red-600 font-bold">{errors}</p>;
}

export default FormErrors;
