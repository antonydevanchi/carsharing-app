import React from "react";
import "./FormsIcon.scss";

function FormsIcon({ isActive }) {
  return (
    <svg
      className={`forms-icon ${isActive ? "forms-icon_active" : ""}`}
      viewBox="0 0 13 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8949 2H2.60538C1.99749 2 1.50012 2.5 1.50012 3.11111V4.77778H12.0001V3.11111C12.0001 2.5 11.5028 2 10.8949 2ZM10.8947 12H9.23682V5.88889H12V10.8889C12 11.5 11.5026 12 10.8947 12ZM8.13157 5.9H5.36841V12H8.13157V5.9ZM2.60526 12C1.99737 12 1.5 11.5 1.5 10.8889V5.88889H4.26316V12H2.60526Z"
      />
    </svg>
  );
}
export default FormsIcon;
