import parking from '../images/parking.jpg';
import insurance from '../images/insurance.jpg';
import petrol from '../images/petrol.jpg';
import service from '../images/service.jpg';

export const SLIDES = [
  {    
    image: parking,
    title: 'Бесплатная парковка',
    description: 'Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.',
    btnClassName: 'button button_middle button_theme_green'
  },
  {
    image: insurance,
    title: 'Страховка',
    description: 'Полная страховка страховка автомобиля',
    btnClassName: 'button button_middle button_theme_blue'
  },
  {
    image: petrol,
    title: 'Бензин',
    description: 'Полный бак на любой заправке города за наш счёт',
    btnClassName: 'button button_middle button_theme_red'
  },
  {
    image: service,
    title: 'Обслуживание',
    description: 'Автомобиль проходит еженедельное ТО',
    btnClassName: 'button button_middle button_theme_violet'
  },
];

export const API_URL = 'http://api-factory.simbirsoft1.com/api';

