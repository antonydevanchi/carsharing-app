import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__contacts footer__contacts_copyright">&copy; 2016-2019 «Need for drive»</p>
      <a href="#" target="_blank" className="footer__contacts footer__contacts_phone">8 (495) 234-22-44</a>
    </footer>
  )
}

export default Footer;