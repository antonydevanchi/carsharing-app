import React from "react";
import { useHistory } from "react-router-dom";
import AdminButton from "../AdminButton/AdminButton";
import { createClassName } from "../../../../utils/createClassName";
import "./ErrorPage.scss";

function ErrorPage() {
  const history = useHistory();
  const createCn = (element, modifier) =>
    createClassName("error-page", element, modifier);

  function handleClick() {
    history.goBack();
  }

  return (
    <div className={createCn()}>
      <span className={createCn("error")}>500</span>
      <h1 className={createCn("title")}>Что то пошло не так</h1>
      <p className={createCn("text")}>Попробуйте перезагрузить страницу</p>
      <AdminButton
        text="Назад"
        type="button"
        size="mini"
        onClick={handleClick}
      />
    </div>
  );
}

export default ErrorPage;
