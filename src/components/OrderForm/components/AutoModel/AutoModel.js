import React from 'react';
import Card from './components/Card/Card';
import './AutoModel.scss';

function AutoModel() {
  return (
    <div className="auto-model">
      <form className="auto-model__form">
        <input className="auto-model__input" type="radio" name="modelType" id="allModels" value="all" defaultChecked />
        <label className="auto-model__item" htmlFor="allModels">Все модели</label>  
        <input className="auto-model__input" type="radio" name="modelType" id="economModels" value="econom" />
        <label className="auto-model__item" htmlFor="economModels">Эконом</label>
        <input className="auto-model__input" type="radio" name="modelType" id="premiumModels" value="premium" />
        <label className="auto-model__item" htmlFor="premiumModels">Премиум</label>
      </form>
      <div className="auto-model__card-container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  )
}
  
  export default AutoModel;