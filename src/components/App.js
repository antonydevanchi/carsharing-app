import './App.scss';
import React from 'react';
import './App.scss';
import Navbar from './Navbar/Navbar';
import Header from './Header/Header';
import MainContent from './MainContent/MainContent';
import Footer from './Footer/Footer';
import NewSlider from './Slider/NewSlider';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import OrderForm from './OrderForm/OrderForm';

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
          <Route path="/order-form">
            <div className="order-page">
              <Header />   
              <OrderForm />           
            </div>
          </Route>
        </Switch>    
      </div>    
    </BrowserRouter>
  );
}

export default App;
