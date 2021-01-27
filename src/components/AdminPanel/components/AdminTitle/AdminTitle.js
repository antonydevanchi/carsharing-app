import React from "react";
import { createClassName } from "../../../../utils/createClassName";
import "./AdminTitle.scss";

function AdminTitle({ text }) {
  const createCn = (element, modifier) =>
    createClassName("admin-title", element, modifier);

  return <h1 className={createCn()}>{text}</h1>;
}

export default AdminTitle;
