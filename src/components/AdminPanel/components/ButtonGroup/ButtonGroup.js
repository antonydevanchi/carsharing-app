import React from "react";
import { createClassName } from "../../../../utils/createClassName";
import "./ButtonGroup.scss";
import greenCheck from "../../../../images/green-check.svg";
import editIcon from "../../../../images/edit-icon.svg";
import rejectIcon from "../../../../images/reject-icon.svg";

function ButtonGroup({ handleConfirm, handleEdit, handleCancel }) {
  const createCn = (element, modifier) =>
    createClassName("button-group", element, modifier);

  return (
    <div className={createCn()}>
      <button
        className={createCn("button", { position: "left" })}
        onClick={handleConfirm}
      >
        <img className={createCn("image")} src={greenCheck} alt="Готово" />
        Готово
      </button>
      <button
        className={createCn("button", { position: "middle" })}
        onClick={handleCancel}
      >
        <img className={createCn("image")} src={rejectIcon} alt="Отмена" />
        Отмена
      </button>
      <button
        className={createCn("button", { position: "right" })}
        onClick={handleEdit}
      >
        <img className={createCn("image")} src={editIcon} alt="Изменить" />
        Изменить
      </button>
    </div>
  );
}

export default ButtonGroup;
