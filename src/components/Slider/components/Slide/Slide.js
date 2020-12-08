import React from 'react';
import './Slide.scss';
import Button from '../../../Button/Button';

function Slide({image, title, description, btnClassName}) {
    
  return (   
    <div className="slider__content" style={{ backgroundImage: `url(${image})` }} > 
      <h2 className="slider__title">{title}</h2>
      <p className="slider__text">{description}</p>
      <Button          
          text="Подробнее"
          className={btnClassName}
      /> 
    </div>    
  )
}

export default Slide;