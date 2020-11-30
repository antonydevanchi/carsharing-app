import React from "react";
import "./Button.scss";

function Button({ className, onClick, disabled, text }) {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

export default Button;
