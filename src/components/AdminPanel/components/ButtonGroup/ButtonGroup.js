import React from "react";
import { withNaming } from "@bem-react/classname";
import "./ButtonGroup.scss";
import greenCheck from "../../../../images/green-check.svg";
import editIcon from "../../../../images/edit-icon.svg";
import rejectIcon from "../../../../images/reject-icon.svg";

function ButtonGroup() {
  const cn = withNaming({ n: "", e: "__", m: "_" });
  return (
    <div className="button-group">
      <button className={cn("button-group", "button")({ position: "left" })}>
        <img className="button-group__image" src={greenCheck} alt="Готово" />
        Готово
      </button>
      <button className={cn("button-group", "button")({ position: "middle" })}>
        <img className="button-group__image" src={rejectIcon} alt="Отмена" />
        Отмена
      </button>
      <button className={cn("button-group", "button")({ position: "right" })}>
        <img className="button-group__image" src={editIcon} alt="Изменить" />
        Изменить
      </button>
    </div>
  );
}

export default ButtonGroup;
