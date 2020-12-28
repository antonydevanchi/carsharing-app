import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./AddIcon.scss";

function AddIcon() {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    location.pathname === "/admin/content/table"
      ? setIsActive(true)
      : setIsActive(false);
  }, [location.pathname]);

  return (
    <svg
      className={`add-icon ${isActive ? "add-icon_active" : ""}`}
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 1H3.5C2.95 1 2.505 1.45 2.505 2L2.5 10C2.5 10.55 2.945 11 3.495 11H9.5C10.05 11 10.5 10.55 10.5 10V4L7.5 1ZM8.5 8H7V9.5H6V8H4.5V7H6V5.5H7V7H8.5V8ZM7 1.75V4.5H9.75L7 1.75Z"
      />
    </svg>
  );
}
export default AddIcon;
