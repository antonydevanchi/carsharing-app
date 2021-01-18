import React, { useState } from "react";
import { withNaming } from "@bem-react/classname";
import AdminCheckbox from "../AdminCheckbox/AdminCheckbox";
import "./AdminInput.scss";

function AdminInput({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  kind,
  position,
  addition,
  isError,
  options,
}) {
  const cn = withNaming({ n: "", e: "__", m: "_" });
  const [itemValues, setItemValues] = useState(options);

  function handleAddItem(e) {
    const input = e.target.previousSibling;
    if (input.value) {
      setItemValues([...itemValues, input.value]);
    }
    input.value = "";
  }

  function handleDeleteItem(e) {
    const index = itemValues.indexOf(e.target.value);
    const newItemValues = itemValues.slice();
    newItemValues.splice(index, 1);
    setItemValues(newItemValues);
  }

  return (
    <label
      className={cn("admin-input")({ kind: kind, position: position })}
      htmlFor={id}
    >
      {label}
      <div className="admin-input__container">
        <input
          className={
            isError
              ? cn("admin-input", "field")({ kind: kind, border: "red" })
              : cn("admin-input", "field")({ kind: kind })
          }
          type={type}
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
        />
        {addition && (
          <button
            type="button"
            className="admin-input__button"
            onClick={handleAddItem}
          >
            +
          </button>
        )}
      </div>
      {isError && <span className="admin-input__error">Ошибка</span>}
      {addition && (
        <AdminCheckbox
          values={itemValues}
          onChange={handleDeleteItem}
          checkedValues={itemValues}
          type="input"
        />
      )}
    </label>
  );
}

export default AdminInput;
