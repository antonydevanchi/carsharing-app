import React from "react";
import { withNaming } from "@bem-react/classname";
import "./AdminButton.scss";

function AdminButton({ text, type, color, size, position, disabled, onClick }) {
  const cn = withNaming({ n: "", e: "__", m: "_" });
  return (
    <button
      className={cn("admin-button")({
        theme: color,
        size: size,
        position: position,
      })}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
}

export default AdminButton;
