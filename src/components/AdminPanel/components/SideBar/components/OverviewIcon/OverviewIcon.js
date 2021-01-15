import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./OverviewIcon.scss";

function OverviewIcon() {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    location.pathname === "/admin/content/order-card"
      ? setIsActive(true)
      : setIsActive(false);
  }, [location.pathname]);

  return (
    <svg
      className={`overview-icon ${isActive ? "overview-icon_active" : ""}`}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.17647 8.11538H2.5V3.5H6.17647V8.11538ZM6.17647 13.5H2.5V8.88461H6.17647V13.5ZM6.91174 13.5H10.5882V8.88461H6.91174V13.5ZM15 13.5H11.3235V8.88461H15V13.5ZM6.91174 8.11538H10.5882V3.5H6.91174V8.11538ZM11.3235 8.11538V3.5H15V8.11538H11.3235Z"
      />
    </svg>
  );
}
export default OverviewIcon;
