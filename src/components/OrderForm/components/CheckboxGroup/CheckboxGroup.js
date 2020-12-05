import React from "react";
import "./CheckboxGroup.scss";

function CheckboxGroup({ values, onChange }) {
  return (
    <div className="checkbox-group">
      {values.map((item, i) => (
        <p title={item.message} className="checkbox-group__item" key={i}>
          <input
            className="checkbox-group__checkbox"
            type="checkbox"
            name={item.id}
            id={item.id}
            value={item.type}
            onChange={onChange}
            disabled={item.disabled}
          />
          <label className="checkbox-group__name" htmlFor={item.id}>
            {item.type}
            <span>, {item.price}</span>
          </label>
        </p>
      ))}
    </div>
  );
}

export default CheckboxGroup;
