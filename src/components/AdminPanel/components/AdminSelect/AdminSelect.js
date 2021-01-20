import React from "react";
import { createClassName } from "../../../../utils/createClassName";
import "./AdminSelect.scss";

function AdminSelect({ name, options, handleChange }) {
  const createCn = (element, modifier) =>
    createClassName("admin-select", element, modifier);

  return (
    <div className={createCn()}>
      <select
        className={createCn("select")}
        name={name}
        onChange={handleChange}
      >
        {options.map((item, i) => (
          <option className={createCn("option")} key={i}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AdminSelect;
