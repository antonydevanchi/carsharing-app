import React from "react";
import AdminButton from "../AdminButton/AdminButton";
import { createClassName } from "../../../../utils/createClassName";
import "./ButtonBlock.scss";

function ButtonBlock({
  handleReset,
  isResetDisabled,
  handleDelete,
  isDeletionDisabled,
  isSavingDisabled,
}) {
  const createCn = (element, modifier) =>
    createClassName("button-block", element, modifier);

  return (
    <div className={createCn()}>
      <div className={createCn("button-group")}>
        <AdminButton
          text="Сохранить"
          type="submit"
          position="left"
          disabled={isSavingDisabled}
        />
        <AdminButton
          text="Отменить"
          type="reset"
          onClick={handleReset}
          disabled={isResetDisabled}
        />
      </div>
      <AdminButton
        text="Удалить"
        type="button"
        color="red"
        onClick={handleDelete}
        disabled={isDeletionDisabled}
      />
    </div>
  );
}

export default ButtonBlock;
