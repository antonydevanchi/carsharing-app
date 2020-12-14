import React from "react";
import Button from "../../../../../Button/Button";
import "./Popup.scss";

function Popup({ togglePopup, confirmOrder }) {
  return (
    <div className="popup">
      <h2 className="popup__title">Подтвердить заказ</h2>
      <div className="popup__button-container">
        <Button
          text="Подтвердить"
          className="button button_middle-plus"
          onClick={confirmOrder}
        />
        <Button
          text="Вернуться"
          className="button button_middle button_theme_red"
          onClick={togglePopup}
        />
      </div>
    </div>
  );
}

export default Popup;
