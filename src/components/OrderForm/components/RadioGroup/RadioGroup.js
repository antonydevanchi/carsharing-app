import React from "react";
import { withNaming } from "@bem-react/classname";
import "./RadioGroup.scss";

function RadioGroup({ value, name, values, onChange, modifier }) {
  const cn = withNaming({ n: "", e: "__", m: "_" });
  return (
    <div className={cn("radio-group")({ type: modifier })}>
      {values.map((item, i) => (
        <p className={cn("radio-group", "item")({ type: modifier })} key={i}>
          <input
            className="radio-group__radio"
            type="radio"
            name={name}
            id={item.id}
            value={item.type}
            onChange={onChange}
            checked={value === item.type}
          />
          <label className="radio-group__name" htmlFor={item.id}>
            {item.type}
            {item.price && item.unit && (
              <span>
                , {item.price} ₽/{item.unit}
              </span>
            )}
            {item.price && !item.unit && <span>, {item.price}</span>}
          </label>
        </p>
      ))}
    </div>
  );
}

export default RadioGroup;
