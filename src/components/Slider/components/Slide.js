import React from 'react';
import './Slide.scss';
import Button from '../../Button/Button';

function Slide(props) {
  const {image, title, description, btnBackground} = props;
  
  return (    
    <div className="slider__content" style={{ backgroundImage: `url(${image})` }} > 
      <h2 className="slider__title">{title}</h2>
      <p className="slider__text">{description}</p>
      <Button 
          style={{ width: 164, marginTop: 32, backgroundImage: `${btnBackground}`, borderRadius: 4, zIndex: 5 }}
          text="Подробнее"
          className="button"
        /> 
    </div>    
  )
}

export default Slide;