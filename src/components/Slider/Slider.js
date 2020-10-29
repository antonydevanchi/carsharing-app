import React from 'react';
import './Slider.scss';
import Button from '../Button/Button';

function Slider() {
  return (
    <section className="slider">
      <div className="slider__btn-container slider__btn-container_prev">
        <button className="slider__btn slider__btn_prev" />        
      </div>
      <div className="slider__wrapper">
        <h2 className="slider__title">Бесплатная парковка</h2>
        <p className="slider__text">Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.</p>
        <Button 
          style={{ width: 164, marginTop: 32, backgroundImage: 'linear-gradient(90deg, #13493f 0%, #0c7b1b 100%)', borderRadius: 4 }}
          text="Подробнее"
          className="button"
        /> 
        <div className="slider__pagination">
          <div className="slider__dot" />
          <div className="slider__dot slider__dot_active" />
          <div className="slider__dot" />
          <div className="slider__dot" />
        </div>
      </div>
      <div className="slider__btn-container slider__btn-container_next">
        <button className="slider__btn slider__btn_next" />       
      </div>
    </section>
  )
}

export default Slider;