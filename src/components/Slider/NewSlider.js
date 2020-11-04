import React from 'react';
import './NewSlider.scss';
import Slide from './components/Slide';
import Arrow from './components/Arrow';
import Dots from './components/Dots';
import parking from '../../images/parking.jpg';
import insurance from '../../images/insurance.jpg';
import petrol from '../../images/petrol.jpg';
import service from '../../images/service.jpg';



function NewSlider() {
  
  const slides = [
    { 
      image: parking,
      title: 'Бесплатная парковка',
      description: 'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.',
      btnBackground: 'linear-gradient(90deg, #13493f 0%, #0c7b1b 100%)'
    },
    {
      image: insurance,
      title: 'Страховка',
      description: 'Полная страховка страховка автомобиля',
      btnBackground: 'linear-gradient(90deg, #132949 0%, #0c7b67 100%)'
    },
    {
      image: petrol,
      title: 'Бензин',
      description: 'Полный бак на любой заправке города за наш счёт',
      btnBackground: 'linear-gradient(90deg, #493013 0%, #7b0c3b 100%)'
    },
    {
      image: service,
      title: 'Обслуживание',
      description: 'Автомобиль проходит еженедельное ТО',
      btnBackground: 'linear-gradient(90deg, #281349 0%, #720c7b 100%)'
    },
  ];

  const [ activeIndex, setActiveIndex ] = React.useState(0);  
 
  const nextSlide = () => {
    if (activeIndex === slides.length - 1) {
      return setActiveIndex(0)
    }
    setActiveIndex( activeIndex + 1)    
  }

  const prevSlide = () => {
    if (activeIndex === 0) {
      return setActiveIndex(slides.length - 1)    
    }
    setActiveIndex( activeIndex - 1)   
  };

  return (
    <section className="slider">      
      <Slide          
        image={slides[activeIndex].image}
        title={slides[activeIndex].title}
        description={slides[activeIndex].description} 
        btnBackground={slides[activeIndex].btnBackground}           
      />    
      <Arrow direction="right" handleClick={nextSlide} />
      <Arrow direction="left" handleClick={prevSlide} />   
      <Dots slides={slides} activeIndex={activeIndex} />
    </section>      
  )
}

export default NewSlider;