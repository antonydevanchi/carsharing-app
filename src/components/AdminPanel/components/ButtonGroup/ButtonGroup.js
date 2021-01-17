import React from "react";
import { withNaming } from "@bem-react/classname";
import "./ButtonGroup.scss";
import greenCheck from "../../../../images/green-check.svg";
import editIcon from "../../../../images/edit-icon.svg";
import rejectIcon from "../../../../images/reject-icon.svg";

function ButtonGroup() {
  const cn = withNaming({ n: "button-group", e: "__", m: "_" });

  return (
    <div className={cn("")()}>
      <button className={cn("", "button")({ position: "left" })}>
        <img className={cn("", "image")()} src={greenCheck} alt="Готово" />
        Готово
      </button>
      <button className={cn("", "button")({ position: "middle" })}>
        <img className={cn("", "image")()} src={rejectIcon} alt="Отмена" />
        Отмена
      </button>
      <button className={cn("", "button")({ position: "right" })}>
        <img className={cn("", "image")()} src={editIcon} alt="Изменить" />
        Изменить
      </button>
    </div>
  );
}

export default ButtonGroup;
