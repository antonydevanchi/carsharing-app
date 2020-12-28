import React from "react";
import { useHistory } from "react-router-dom";
import AdminButton from "../AdminButton/AdminButton";
import "./ErrorPage.scss";

function ErrorPage() {
  const history = useHistory();

  function handleClick() {
    history.goBack();
  }

  return (
    <div className="error-page">
      <span className="error-page__error">500</span>
      <h1 className="error-page__title">Что то пошло не так</h1>
      <p className="error-page__text">Попробуйте перезагрузить страницу</p>
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
