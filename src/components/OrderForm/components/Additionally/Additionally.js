import React from 'react';
import './Additionally.scss';

function Additionally() {
  return (
    <form className="additionally" >
      <h4 className="additionally__title" >Цвет</h4>
      <div className="additionally__container">
        <input className="additionally__radio" type="radio" name="color" id="any" value="any" defaultChecked />
        <label className="additionally__item" htmlFor="any">Любой</label>  
        <input className="additionally__radio" type="radio" name="color" id="red" value="red" />
        <label className="additionally__item" htmlFor="red">Красный</label>
        <input className="additionally__radio" type="radio" name="color" id="blue" value="blue" />
        <label className="additionally__item" htmlFor="blue">Голубой</label>
      </div>
      <h4 className="additionally__title">Дата аренды</h4>        
      <div className="additionally__container additionally__container_column additionally__container_right">
        <p className="additionally__text">
          <label className="additionally__item" htmlFor="date" >С
            <input type="text" id="date" value="12.06.2019 12:00" className="additionally__input additionally__input_icon" readOnly/>            
            <button type="button" className="additionally__btn-reset" />
          </label> 
        </p> 
        <p className="additionally__text">        
          <label className="additionally__item" htmlFor="handleDate" >По
            <input type="text" id="handleDate" className="additionally__input"  placeholder="Введите дату и время" autoComplete="on" /> 
          </label>
        </p>
      </div>
      <h4 className="additionally__title">Тариф</h4>
        <div className="additionally__container additionally__container_column">
          <p className="additionally__text">
            <input className="additionally__radio" type="radio" name="rate" id="forMinutes" value="minutes" defaultChecked />
            <label className="additionally__item" htmlFor="forMinutes">Поминутно, 7₽/мин</label>  
          </p>
          <p className="additionally__text">
            <input className="additionally__radio" type="radio" name="rate" id="forDay" value="day" />
            <label className="additionally__item" htmlFor="forDay">На сутки, 1999 ₽/сутки</label>
          </p>
        </div>
        <h4 className="additionally__title">Доп услуги</h4>
        <div className="additionally__container additionally__container_column">
          <p className="additionally__text">
            <input className="additionally__checkbox" type="checkbox" name="additionally" id="fullTank" value="fullTank" defaultChecked />
            <label className="additionally__item" htmlFor="fullTank">Полный бак, 500р</label>  
          </p>
          <p className="additionally__text">
            <input className="additionally__checkbox" type="checkbox" name="additionally" id="babyChair" value="babyChair" />
            <label className="additionally__item" htmlFor="babyChair">Детское кресло, 200р</label>  
          </p>
          <p className="additionally__text">  
            <input className="additionally__checkbox" type="checkbox" name="additionally" id="rightHandDrive" value="rightHandDrive" />
            <label className="additionally__item" htmlFor="rightHandDrive">Правый руль, 1600р</label>  
          </p>
        </div>
    </form>
  )
}
  
export default Additionally;