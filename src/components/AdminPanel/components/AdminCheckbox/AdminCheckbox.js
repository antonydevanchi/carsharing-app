import React from "react";
import { withNaming } from "@bem-react/classname";
import "./AdminCheckbox.scss";

function AdminCheckbox({ values, onChange, checkedValues, type }) {
  const cn = withNaming({ n: "", e: "__", m: "_" });

  return (
    <ul className={cn("admin-checkbox")({ type: type })}>
      {values &&
        values.map((item, i) => (
          <li title={item} className="admin-checkbox__item" key={i}>
            <input
              className="admin-checkbox__checkbox"
              type="checkbox"
              name={`id${i}`}
              id={`id${i}`}
              value={item}
              onChange={onChange}
              defaultChecked={
                checkedValues && checkedValues.includes(item) ? true : false
              }
            />
            <label className="admin-checkbox__name" htmlFor={`id${i}`}>
              {item}
            </label>
          </li>
        ))}
    </ul>
  );
}

export default AdminCheckbox;
