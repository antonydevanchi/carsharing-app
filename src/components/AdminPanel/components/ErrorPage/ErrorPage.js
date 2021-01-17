import React from "react";
import { useHistory } from "react-router-dom";
import { withNaming } from "@bem-react/classname";
import AdminButton from "../AdminButton/AdminButton";
import "./ErrorPage.scss";

function ErrorPage() {
  const history = useHistory();
  const cn = withNaming({ n: "error-page", e: "__", m: "_" });

  function handleClick() {
    history.goBack();
  }

  return (
    <div className={cn("")()}>
      <span className={cn("", "error")()}>500</span>
      <h1 className={cn("", "title")()}>Что то пошло не так</h1>
      <p className={cn("", "text")()}>Попробуйте перезагрузить страницу</p>
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
