import React from 'react';
import Button from '../../../Button/Button';
import './Order.scss';

function Order() {
  return (
    <div className="order">
      <h2 className="order__title" >Ваш заказ:</h2>
      <div className="order__container">
        <p className="order__text">Пункт&nbsp;выдачи</p>
        <div className="order__line"/>
        <p className="order__text order__text_thin">Ульяновск, Нариманова&nbsp;42</p>
      </div>      
      <div className="order__container order__container_price">
        <h3 className="order__price order__price_title">Цена:</h3>
        <span className="order__price">от</span>
        <span className="order__price">8 000</span>
        <span className="order__price">до</span>
        <span className="order__price">12 000</span>
        <span className="order__price" >₽</span>
      </div>
      <Button
        style={{ width: 287, marginTop: 32, alignSelf: 'center'}}
        text="Выбрать модель"
        className="button button__disabled button_max"
      />
    </div>  
  )
}

export default Order;