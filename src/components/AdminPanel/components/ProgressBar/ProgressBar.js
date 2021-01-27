import React from "react";
import { createClassName } from "../../../../utils/createClassName";
import "./ProgressBar.scss";

function ProgressBar({ value }) {
  const createCn = (element, modifier) =>
    createClassName("progress-bar", element, modifier);

  return (
    <div className={createCn()}>
      <div className={createCn("container")}>
        <p className={createCn("value")}>Заполнено</p>
        <span className={createCn("value")}>{value}%</span>
      </div>
      <div className={createCn("scale")}>
        <div
          className={createCn("color-value")}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
