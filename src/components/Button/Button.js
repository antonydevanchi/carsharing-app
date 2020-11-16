import React from 'react';
import './Button.scss';

function Button(props) {
 
  return (    
    <button 
      className={props.className}       
    >
      {props.text}
    </button>
    
  )
}

export default Button;