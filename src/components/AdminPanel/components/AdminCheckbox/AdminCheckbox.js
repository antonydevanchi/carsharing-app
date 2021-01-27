import React from "react";
import { createClassName } from "../../../../utils/createClassName";
import "./AdminCheckbox.scss";

function AdminCheckbox({ values, onChange, checkedValues, type }) {
  const createCn = (element, modifier) =>
    createClassName("admin-checkbox", element, modifier);

  return (
    <ul className={createCn("", { type: type })}>
      {values &&
        values.map((item, i) => (
          <li title={item} className={createCn("item")} key={i}>
            <input
              className={createCn("checkbox")}
              type="checkbox"
              name={`id${i}`}
              id={`id${i}`}
              value={item}
              onChange={onChange}
              defaultChecked={checkedValues && checkedValues.includes(item)}
            />
            <label className={createCn("name")} htmlFor={`id${i}`}>
              {item}
            </label>
          </li>
        ))}
    </ul>
  );
}

export default AdminCheckbox;
