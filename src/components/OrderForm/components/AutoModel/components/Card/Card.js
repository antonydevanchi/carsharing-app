import React from 'react';
import './Card.scss';
import elantra from '../../../../../../images/elantra.jpg';

function Card() {
  return (
    <div className="card">
      <h3 className="card__title">ELANTRA</h3>
      <div className="card__price-container">
        <span className="card__price">12 000</span>
        <span className="card__price">-</span>
        <span className="card__price">25 000</span>
        <span className="card__price">₽</span>
      </div>  
      <img className="card__image" src={elantra} alt="" />
    </div> 
  )
}
  
  export default Card;