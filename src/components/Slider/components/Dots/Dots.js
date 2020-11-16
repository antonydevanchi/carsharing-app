import React from 'react';
import './Dots.scss';

function Dots(props) {
  
  return (
    <div className="slider__pagination">
      {props.slides.map((slide, i) => {
        if (props.activeIndex === i) {
          return <div key={slide + i} className="slider__dot slider__dot_active" />
        } else {
          return <div key={slide + i} className="slider__dot" />
        }
      })}      
    </div>   
  )
}

export default Dots;

