import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./PersonIcon.scss";

function PersonIcon() {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    location.pathname === "/admin/content/menu6"
      ? setIsActive(true)
      : setIsActive(false);
  }, [location.pathname]);

  return (
    <svg
      className={`person-icon ${isActive ? "person-icon_active" : ""}`}
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.875 3.125C9.875 4.85156 8.47656 6.25 6.75 6.25C5.02344 6.25 3.625 4.85156 3.625 3.125C3.625 1.39844 5.02344 0 6.75 0C8.47656 0 9.875 1.39844 9.875 3.125ZM0.5 10.9375C0.5 8.85938 4.66406 7.8125 6.75 7.8125C8.83594 7.8125 13 8.85938 13 10.9375V12.5H0.5V10.9375Z"
      />
    </svg>
  );
}
export default PersonIcon;
