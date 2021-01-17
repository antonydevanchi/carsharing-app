import React from "react";
import { withNaming } from "@bem-react/classname";
import "./AdminSelect.scss";

function AdminSelect({ name, options, handleChange }) {
  const cn = withNaming({ n: "admin-select", e: "__", m: "_" });

  return (
    <div className={cn("")()}>
      <select
        className={cn("", "select")()}
        name={name}
        onChange={handleChange}
      >
        {options.map((item, i) => (
          <option className={cn("", "option")()} key={i}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AdminSelect;
