import React from "react";
import { createClassName } from "../../../../utils/createClassName";
import logo from "../../../../images/logo.svg";
import "./Logo.scss";

function Logo({ text, modifier }) {
  const createCn = (element, modifier) =>
    createClassName("logo", element, modifier);

  return (
    <div className={createCn("", { type: modifier })}>
      <img
        className={createCn("image", { type: modifier })}
        src={logo}
        alt="Логотип"
      />
      <h2 className={createCn("title", { type: modifier })}>{text}</h2>
    </div>
  );
}

export default Logo;
