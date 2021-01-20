import React from "react";
import { createClassName } from "../../../../utils/createClassName";
import "./AdminButton.scss";

function AdminButton({ text, type, color, size, position, disabled, onClick }) {
  const createCn = (element, modifier) =>
    createClassName("admin-button", element, modifier);

  return (
    <button
      className={createCn("", {
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
