import React from 'react';
import './Arrow.scss';
import leftArrow from '../../../images/btn_prev.svg';
import rightArrow from '../../../images/btn_next.svg';


function Arrow(props) {

  return (
    <>   
      {props.direction === 'left' && 
        <button className="slider__btn slider__btn_prev" onClick={props.handleClick}>
          <img className="slider__btn-image" src={leftArrow} alt="Стрелка влево" />
        </button>    
      } 
      {props.direction === 'right' &&
        <button className="slider__btn slider__btn_next" onClick={props.handleClick}>
          <img className="slider__btn-image" src={rightArrow} alt="Стрелка вправо" />
        </button>
      }      
    </>
  )
}

export default Arrow;