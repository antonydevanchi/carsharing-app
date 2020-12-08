import React from 'react';
import './Header.scss';
import locality from '../../images/locality.svg';

function Header() {
  return (
    <header className="header">
      <p className="header__logo" lang="en">Need for drive</p>
      <p className="header__place">
        <img className="header__place-icon" src={locality} alt="Метка" />
        Ульяновск
      </p>
    </header>
  )
}

export default Header;