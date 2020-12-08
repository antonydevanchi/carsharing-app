import React from "react";
import { withNaming } from "@bem-react/classname";
import "./PriceContainer.scss";

function PriceContainer({ priceMin, priceMax, price }) {
  const cn = withNaming({ n: "price-", e: "__", m: "_" });

  return (
    <div className="price-container">
      <h3 className={cn("container", "item")({ type: "title" })}>Цена:</h3>
      {priceMin && (
        <>
          <span className="price-container__item">от</span>
          <span className="price-container__item">{priceMin}</span>
          <span className="price-container__item">до</span>
          <span className="price-container__item">{priceMax}</span>
        </>
      )}
      {price && <span className="price-container__item">{price}</span>}
      <span className="price-container__item">₽</span>
    </div>
  );
}

export default PriceContainer;
