import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ErrorIcon.scss";

function ErrorIcon() {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    location.pathname === "/admin/content/menu7"
      ? setIsActive(true)
      : setIsActive(false);
  }, [location.pathname]);

  return (
    <svg
      className={`error-icon ${isActive ? "error-icon_active" : ""}`}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.25 1.5C4.076 1.5 1.5 4.076 1.5 7.25C1.5 10.424 4.076 13 7.25 13C10.424 13 13 10.424 13 7.25C13 4.076 10.424 1.5 7.25 1.5ZM7.82505 10.125H6.67505V8.97501H7.82505V10.125ZM6.67505 7.825H7.82505V4.375H6.67505V7.825Z"
      />
    </svg>
  );
}
export default ErrorIcon;
