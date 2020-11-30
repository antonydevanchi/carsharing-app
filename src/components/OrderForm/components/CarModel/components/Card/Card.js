import React, { useState, useEffect } from "react";
import { makePriceWithGap } from "../../../../../../utils/price";
import { URL_SIMBIRSOFT } from "../../../../../../constants/constants";
import "./Card.scss";

function Card(props) {
  const [isActive, setIsActive] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    if (props.image.startsWith("data")) {
      setImgSrc(props.image);
    } else {
      setImgSrc(`${URL_SIMBIRSOFT}${props.image}`);
    }
  }, [props.image]);

  function setNameAndPrice(name, minPrice, maxPrice) {
    props.handleSubmit(name);
    props.displayPrice(minPrice, maxPrice);
    setIsActive(!isActive);
  }

  return (
    <div
      className={`card ${isActive ? "card_active" : ""}`}
      onClick={() =>
        setNameAndPrice(props.name, props.priceMin, props.priceMax)
      }
    >
      <h3 className="card__title">{props.name}</h3>
      <div className="card__price-container">
        <span className="card__price">{makePriceWithGap(props.priceMin)}</span>
        <span className="card__price">-</span>
        <span className="card__price">{makePriceWithGap(props.priceMax)}</span>
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
