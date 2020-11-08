import React from 'react';
import './Location.scss';
import map from '../../../../images/map.jpg';

function Location() {
  return (
    <form className="location">
      <div className="location__container">
        <p className="location__text">
          <label className="location__item" htmlFor="city" >Город
            <input type="text" id="city" value="Ульяновск" className="location__input location__input_icon" readOnly/>            
            <button type="button" className="location__btn-reset" />
          </label> 
        </p> 
        <p className="location__text">        
          <label className="location__item" htmlFor="pickUpPoint" >Пункт выдачи
            <input type="text" id="pickUpPoint" className="location__input"  placeholder="Начните вводить пункт ..." autoComplete="on" /> 
          </label>
        </p>
      </div>
      <p className="location__text location__text_map">Выбрать на карте:</p>   
      <img className="location__map" src={map} alt="Карта" />
    </form>
  )
}

export default Location;