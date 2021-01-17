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
  const cn = withNaming({ n: "admin-input", e: "__", m: "_" });
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
    <label className={cn("")({ kind: kind, position: position })} htmlFor={id}>
      {label}
      <div className={cn("", "container")()}>
        <input
          className={cn(
            "",
            "field"
          )({ kind: kind, border: isError ? "red" : "" })}
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
            className={cn("", "button")()}
            onClick={handleAddItem}
          >
            +
          </button>
        )}
      </div>
      {isError && <span className={cn("", "error")()}>Ошибка</span>}
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
