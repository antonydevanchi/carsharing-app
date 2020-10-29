import React from 'react';
import './Button.scss';

function Button(props) {
 
  return (
    <>
      <button 
        className={props.className}
        style={props.style} 
      >
        {props.text}
      </button>
    </>
  )
}

export default Button;