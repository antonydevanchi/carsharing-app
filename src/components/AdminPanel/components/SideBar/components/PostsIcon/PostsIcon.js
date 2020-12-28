import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./PostsIcon.scss";

function PostsIcon() {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    location.pathname === "/admin/content/list"
      ? setIsActive(true)
      : setIsActive(false);
  }, [location.pathname]);

  return (
    <svg
      className={`posts-icon ${isActive ? "posts-icon_active" : ""}`}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.5 3.5V4.85714H7.83333V3.5H2.5ZM7.83333 7.57142H2.5V6.21428H7.83333V7.57142ZM2.5 10.2857H7.83333V8.92857H2.5V10.2857ZM2.5 13H7.83333V11.6429H2.5V13ZM14.5 3.5H9.16663V13H14.5V3.5Z"
      />
    </svg>
  );
}
export default PostsIcon;
