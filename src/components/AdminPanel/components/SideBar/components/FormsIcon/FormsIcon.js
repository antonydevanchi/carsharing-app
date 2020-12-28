import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./FormsIcon.scss";

function FormsIcon() {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    location.pathname === "/admin/content/menu5"
      ? setIsActive(true)
      : setIsActive(false);
  }, [location.pathname]);

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

    // <svg
    //   className={`blog-icon ${isActive ? "blog-icon_active" : ""}`}
    //   width="15"
    //   height="15"
    //   viewBox="0 0 15 15"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <path
    //     fillRule="evenodd"
    //     clipRule="evenodd"
    //     d="M13.3213 4.10853C13.5596 4.34683 13.5596 4.73177 13.3213 4.97007L12.2031 6.08825L9.91174 3.7969L11.0299 2.67873C11.2682 2.44042 11.6532 2.44042 11.8915 2.67873L13.3213 4.10853ZM2.5 13.5V11.2086L9.25795 4.4507L11.5493 6.74205L4.79135 13.5H2.5Z"
    //   />
    // </svg>
  );
}
export default FormsIcon;
