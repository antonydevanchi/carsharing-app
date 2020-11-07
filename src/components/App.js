import './App.scss';
import React from 'react';
import './App.scss';
import Navbar from './Navbar/Navbar';
import Header from './Header/Header';
import MainContent from './MainContent/MainContent';
import Footer from './Footer/Footer';
import NewSlider from './Slider/NewSlider';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs/Breadccrumbs';
import Location from './Location/Location';
import Order from './Order/Order';

function App() {
  return (   
    <BrowserRouter>
      <div className="start-screen">
        <Navbar />
        <Switch>
          <Route path="/carsharing-app">
            <div className="title-page">
              <Header />
              <MainContent />
              <Footer />             
            </div>
            <NewSlider />  
          </Route>    
          <Route path="/location">
            <div className="order-page">
              <Header />            
              <Breadcrumbs />
              <div className="order-content">                
                <Location />               
                <Order />
              </div>            
            </div>
          </Route>
        </Switch>    
      </div>    
    </BrowserRouter>
  );
}

export default App;
