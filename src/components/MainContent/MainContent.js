import React from 'react';
import './MainContent.scss';
import Button from '../Button/Button';
import { Link } from 'react-router-dom'; 

function MainContent() {
  return (
    <section className="main-content">
      <h1 className="main-content__title main-content__title_rus">Каршеринг</h1>
      <h2 className="main-content__title main-content__title_en" lang="en">Need for drive</h2>
      <p className="main-content__text">Поминутная аренда авто твоего города</p>
      <Link to="/order-form/location">
        <Button 
          style={{ width: 250, marginTop: 64 }}
          text="Забронировать"
          className="button button_max"
        />
      </Link>
    </section>
  )
}

export default MainContent;