import './App.scss';
import React from 'react';
import './App.scss';
import Navbar from './Navbar/Navbar';
import Header from './Header/Header';
import MainContent from './MainContent/MainContent';
import Footer from './Footer/Footer';
import NewSlider from './Slider/NewSlider';


function App() {
  return (    
    <div className="start-screen">
      <Navbar />
      <div className="title-page">
          <Header />
          <MainContent />
          <Footer />             
      </div>
      <NewSlider />  
    </div>     
   
  );
}

export default App;
