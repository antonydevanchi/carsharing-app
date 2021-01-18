import React from "react";
import { withNaming } from "@bem-react/classname";
import logo from "../../../../images/logo.svg";
import "./Logo.scss";

function Logo({ text, modifier }) {
  const cn = withNaming({ n: "", e: "__", m: "_" });

  return (
    <div className={cn("logo")({ type: modifier })}>
      <img
        className={cn("logo", "image")({ type: modifier })}
        src={logo}
        alt="Логотип"
      />
      <h2 className={cn("logo", "title")({ type: modifier })}>{text}</h2>
    </div>
  );
}

export default Logo;
