import React from "react";
import MaskedInput from "react-text-mask";
import AdminCheckbox from "../AdminCheckbox/AdminCheckbox";
import { dateMask } from "../../../../constants/constants";
import { createClassName } from "../../../../utils/createClassName";
import "./AdminInput.scss";

function AdminInput({
  label,
  id,
  type,
  value,
  onChange,
  placeholder,
  position,
  addition,
  isError,
  options,
  handleAddItem,
  handleDeleteItem,
  readOnly,
  date,
}) {
  const createCn = (element, modifier) =>
    createClassName("admin-input", element, modifier);

  return (
    <label className={createCn("", { position: position })} htmlFor={id}>
      {label}
      <div className={createCn("container")}>
        {!date && (
          <input
            className={createCn("field", {
              border: isError ? "red" : "",
            })}
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
            readOnly={readOnly}
          />
        )}
        {date && (
          <MaskedInput
            mask={dateMask}
            className={createCn("field", {
              border: isError ? "red" : "",
            })}
            type={type}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            autoComplete="off"
            readOnly={readOnly}
          />
        )}
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
          values={options}
          onChange={handleDeleteItem}
          checkedValues={options}
          type="input"
        />
      )}
    </label>
  );
}

export default AdminInput;
