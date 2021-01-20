import React, { useState } from "react";
import AdminCheckbox from "../AdminCheckbox/AdminCheckbox";
import { createClassName } from "../../../../utils/createClassName";
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
  const [itemValues, setItemValues] = useState(options);

  const createCn = (element, modifier) =>
    createClassName("admin-input", element, modifier);

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
      className={createCn("", { kind: kind, position: position })}
      htmlFor={id}
    >
      {label}
      <div className={createCn("container")}>
        <input
          className={createCn("field", {
            kind: kind,
            border: isError ? "red" : "",
          })}
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
            className={createCn("button")}
            onClick={handleAddItem}
          >
            +
          </button>
        )}
      </div>
      {isError && <span className={createCn("error")}>Ошибка</span>}
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
