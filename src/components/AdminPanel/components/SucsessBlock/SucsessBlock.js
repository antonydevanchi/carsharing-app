import React, { useState } from "react";
import { createClassName } from "../../../../utils/createClassName";
import "./SucsessBlock.scss";
import check from "../../../../images/check-admin.svg";

function SucsessBlock({ text }) {
  const [isBlockVisible, setIsBlockVisible] = useState(true);
  const createCn = (element, modifier) =>
    createClassName("sucsess-block", element, modifier);

  function closeBlock() {
    setIsBlockVisible(false);
  }

  if (!isBlockVisible) {
    return null;
  }

  return (
    <div className={createCn()}>
      <div className={createCn("container")}>
        <img className={createCn("check")} src={check} alt="Галочка" />
        <span className={createCn("text")}> Успех! {text}</span>
      </div>
      <button className={createCn("btn-close")} onClick={closeBlock} />
    </div>
  );
}

export default SucsessBlock;
