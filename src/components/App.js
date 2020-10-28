import './App.scss';
import React from 'react';
import './App.scss';
import Navbar from './Navbar/Navbar';
import Header from './Header/Header';
import MainContent from './MainContent/MainContent';
import Footer from './Footer/Footer';
import Slider from './Slider/Slider';


function App() {
  return (    
    <div className="start-screen">
      <Navbar />
      <div className="title-page">
          <Header />
          <MainContent />
          <Footer />             
      </div>
      <Slider />  
    </div>     
   
  );
}

export default App;
