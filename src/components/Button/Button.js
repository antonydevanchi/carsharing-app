import React from "react";
import "./Button.scss";

function Button(props) {
  return (
    <button
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
}

export default Button;
