import React from 'react';
import './Slider.scss';

function Slider() {
  return (
    <section className="slider">
      <div className="slider__btn-container slider__btn-container_prev">
        <button className="slider__btn slider__btn_prev"/>
      </div>
      <div className="slider__wrapper">
        <h2 className="slider__title">Бесплатная парковка</h2>
        <p className="slider__text">Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.</p>
      </div>
      <div className="slider__btn-container slider__btn-container_next">
        <button className="slider__btn slider__btn_next"/>
      </div>
    </section>
  )
}

export default Slider;