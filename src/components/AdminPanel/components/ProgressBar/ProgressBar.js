import React from "react";
import { withNaming } from "@bem-react/classname";
import "./ProgressBar.scss";

function ProgressBar({ value }) {
  const cn = withNaming({ n: "progress-bar", e: "__", m: "_" });

  return (
    <div className={cn("")()}>
      <div className={cn("", "container")()}>
        <p className={cn("", "value")()}>Заполнено</p>
        <span className={cn("", "value")()}>{value}</span>
      </div>
      <div className={cn("", "scale")()}>
        <div className={cn("", "color-value")()} style={{ width: value }} />
      </div>
    </div>
  );
}

export default ProgressBar;
