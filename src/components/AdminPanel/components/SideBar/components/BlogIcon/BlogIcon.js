import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./BlogIcon.scss";

function BlogIcon() {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    location.pathname === "/admin/content/car"
      ? setIsActive(true)
      : setIsActive(false);
  }, [location.pathname]);

  return (
    <svg
      className={`blog-icon ${isActive ? "blog-icon_active" : ""}`}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3213 4.10853C13.5596 4.34683 13.5596 4.73177 13.3213 4.97007L12.2031 6.08825L9.91174 3.7969L11.0299 2.67873C11.2682 2.44042 11.6532 2.44042 11.8915 2.67873L13.3213 4.10853ZM2.5 13.5V11.2086L9.25795 4.4507L11.5493 6.74205L4.79135 13.5H2.5Z"
      />
    </svg>
  );
}
export default BlogIcon;
