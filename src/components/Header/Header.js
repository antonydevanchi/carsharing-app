import React from 'react';
import './Header.scss';
import locality from '../../images/locality.svg';

function Header() {
  return (
    <header className="header">
      <p className="header__logo">Need for drive</p>
      <p className="header__place">
        <img className="header__place-icon" src={locality} alt="" />
        Ульяновск
      </p>
    </header>
  )
}

export default Header;