import React from "react";
import "./ProgressBar.scss";

function ProgressBar({ value }) {
  return (
    <div className="progress-bar">
      <div className="progress-bar__container">
        <p className="progress-bar__value">Заполнено</p>
        <span className="progress-bar__value">{value}</span>
      </div>
      <div className="progress-bar__scale">
        <div className="progress-bar__color-value" style={{ width: value }} />
      </div>
    </div>
  );
}

export default ProgressBar;
