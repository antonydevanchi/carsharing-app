import React from "react";
import { withNaming } from "@bem-react/classname";
import "./AdminCheckbox.scss";

function AdminCheckbox({ values, onChange, checkedValues, type }) {
  const cn = withNaming({ n: "admin-checkbox", e: "__", m: "_" });

  return (
    <ul className={cn("")({ type: type })}>
      {values &&
        values.map((item, i) => (
          <li title={item} className={cn("", "item")()} key={i}>
            <input
              className={cn("", "checkbox")()}
              type="checkbox"
              name={`id${i}`}
              id={`id${i}`}
              value={item}
              onChange={onChange}
              defaultChecked={checkedValues && checkedValues.includes(item)}
            />
            <label className={cn("", "name")()} htmlFor={`id${i}`}>
              {item}
            </label>
          </li>
        ))}
    </ul>
  );
}

export default AdminCheckbox;
