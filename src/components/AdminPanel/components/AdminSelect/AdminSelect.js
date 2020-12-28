import React from "react";
import "./AdminSelect.scss";

function AdminSelect({ id, options }) {
  return (
    <div className="admin-select">
      <select className="admin-select__select" id={id}>
        {options.map((item, i) => (
          <option className="admin-select__option" key={i}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AdminSelect;
