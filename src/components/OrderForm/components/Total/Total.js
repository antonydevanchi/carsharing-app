import React from 'react';
import './Total.scss';
import elantra from '../../../../images/elantra.jpg';

function Total() {
  return (
    <div className="total">
      <div className="total__container">
        <h3 className="total__auto-model">Hyndai, i30 N</h3>
        <p className="total__car-number">K 761 HA 73</p>
        <p className="total__item">Топливо<span className="total__value">100%</span></p>
        <p className="total__item">Доступна с<span className="total__value">12.06.2019 12:00</span></p>
      </div>
      <img className="total__image" src={elantra} alt="выбранная машина" />
    </div>
  )
}
  
  export default Total;    