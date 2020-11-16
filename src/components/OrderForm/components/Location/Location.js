import React, {useState, useEffect} from 'react';
import {API_URL} from '../../../../constants/constats';
import './Location.scss';
import map from '../../../../images/map.jpg';

function Location() {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState('');
  
  useEffect(() => {
    const cities = ['Ульяновск', 'Самара', 'Казань', 'Саранск'];
    setOptions(cities);
    fetch( `${API_URL}/db/city`, {
      method: 'GET',
      headers: {
        'X-Api-Factory-Application-Id': '5e25c641099b810b946c5d5b',
        'Authorization': 'Bearer 52efbe08228671240494f537f2486bc109a637b4'
      }  
    })
    .then((res) => {
      return res.json();
    })
      .then((data) => {
        console.log(data);
      })

  }, []);
  
  function handleClear() {
    setSearch('');
  }

  const setCityName = city => {
    setSearch(city);
    setDisplay(false);
  }

  return (
    <form className="location">
      <div className="location__container">
        <div className="location__item">
          <label className="location__name" htmlFor="city" >Город
            <input 
              type="text" 
              id="city" 
              onClick={() => setDisplay(!display)}              
              placeholder="Начните вводить город ..." 
              className="location__input" 
              value={search}
              onChange={event => setSearch(event.target.value)} 
              autoComplete="off"
            /> 
            {search && 
              <button type="button" className="location__btn-reset" onClick={handleClear} />
            }         
          </label>
          {display && 
            <ul className="location__autocomplete"> 
              {options
                .filter((item => item.toLowerCase().startsWith(search.toLowerCase())))
                .map((value, i) => {
                  return (
                    <li
                      key={i}
                      onClick={() => setCityName(value)}
                      className="location__autocomplete-item"
                    >
                      {value}                   
                    </li>
                  )
                })
              }
            </ul>
          }
        </div> 
        <div className="location__item">        
          <label className="location__name" htmlFor="pickUpPoint" >Пункт выдачи
            <input 
              type="text"
              id="pickUpPoint"             
              className="location__input"
              placeholder="Начните вводить пункт ..."             
              autoComplete="off"
            /> 
            <button type="button" className="location__btn-reset" onClick={handleClear} />
          </label>
        </div>
      </div>
      <p className="location__item location__item_map">Выбрать на карте:</p>   
      <img className="location__map" src={map} alt="Карта" />
    </form>
  )
}

export default Location;