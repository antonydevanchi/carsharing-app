import React from "react";
import "./AdminSelect.scss";

function AdminSelect({ id, options, handleChange }) {
  return (
    <div className="admin-select">
      <select className="admin-select__select" id={id} onChange={handleChange}>
        {options.map((item, i) => (
          <option className="admin-select__option" key={i}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AdminSelect;
