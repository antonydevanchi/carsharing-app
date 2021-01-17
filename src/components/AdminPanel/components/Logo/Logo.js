import React from "react";
import { withNaming } from "@bem-react/classname";
import logo from "../../../../images/logo.svg";
import "./Logo.scss";

function Logo({ text, modifier }) {
  const cn = withNaming({ n: "logo", e: "__", m: "_" });

  return (
    <div className={cn("")({ type: modifier })}>
      <img
        className={cn("", "image")({ type: modifier })}
        src={logo}
        alt="Логотип"
      />
      <h2 className={cn("", "title")({ type: modifier })}>{text}</h2>
    </div>
  );
}

export default Logo;
