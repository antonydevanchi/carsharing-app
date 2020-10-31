import React from 'react';
import './Navbar.scss';

function Navbar() {
  const [ isClicked, setIsClicked ] = React.useState(false);
  const[isChanged, setIsChanged] = React.useState(false);
  
  function showOrCloseMenu(e) {
    setIsClicked (!isClicked);
    const btnMenu = e.target;
    btnMenu.classList.toggle("navbar__btn_close");
  }

  function changeLanguage() {
    setIsChanged (!isChanged);
  }
  
  return (
    <section className="navbar">
      <div className="navbar__hamburger-menu">
        <button className="navbar__btn" onClick={showOrCloseMenu} />       
        <p className="navbar__language" onClick={changeLanguage}>{ !isChanged ? "Eng" : "Рус"}</p>
      </div>
      { isClicked &&
      <nav className="navbar__menu">        
        <ul className="navbar__list">
          <li className="navbar__item">ПАРКОВКА</li>
          <li className="navbar__item  navbar__item_active">СТРАХОВКА</li>
          <li className="navbar__item">БЕНЗИН</li>
          <li className="navbar__item">ОБСЛУЖИВАНИЕ</li>
        </ul>
        <ul className="navbar__social-media-list">
          <li className="navbar__social-media navbar__social-media_telegram" />
          <li className="navbar__social-media navbar__social-media_facebook " />
          <li className="navbar__social-media navbar__social-media_instagram" />
        </ul>        
      </nav>
      }
    </section>
  )
}

export default Navbar;