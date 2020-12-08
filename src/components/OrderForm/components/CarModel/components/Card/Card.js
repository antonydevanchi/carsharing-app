import React, { useState, useEffect } from "react";
import { makePriceWithGap } from "../../../../../../utils/priceWithGap";
import { URL_SIMBIRSOFT } from "../../../../../../constants/constants";
import "./Card.scss";

function Card({ carObject, handleSubmit, isActive, setIsActive }) {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    if (carObject.thumbnail.path.startsWith("data")) {
      setImgSrc(carObject.thumbnail.path);
    } else {
      setImgSrc(`${URL_SIMBIRSOFT}${carObject.thumbnail.path}`);
    }
  }, [carObject.thumbnail.path]);

  function setNameAndPrice(carObject) {
    handleSubmit(carObject);
    setIsActive(carObject.name);
  }

  return (
    <div
      className={`card ${carObject.name === isActive ? "card_active" : ""}`}
      onClick={() => setNameAndPrice(carObject)}
    >
      <h3 className="card__title">{carObject.name}</h3>
      <div className="card__price-container">
        <span className="card__price">
          {makePriceWithGap(carObject.priceMin)}
        </span>
        <span className="card__price">-</span>
        <span className="card__price">
          {makePriceWithGap(carObject.priceMax)}
        </span>
        <span className="card__price">₽</span>
      </div>
      <img
        className="card__image"
        crossOrigin="anonymous"
        referrerPolicy="origin"
        src={imgSrc}
        alt="Фото машины"
      />
    </div>
  );
}

export default Card;
