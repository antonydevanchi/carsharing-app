import parking from "../images/parking.jpg";
import insurance from "../images/insurance.jpg";
import petrol from "../images/petrol.jpg";
import service from "../images/service.jpg";

export const SLIDES = [
  {
    image: parking,
    title: "Бесплатная парковка",
    description:
      "Оставляйте машину на платных городских парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.",
    btnClassName: "button button_middle button_theme_green",
  },
  {
    image: insurance,
    title: "Страховка",
    description: "Полная страховка страховка автомобиля",
    btnClassName: "button button_middle button_theme_blue",
  },
  {
    image: petrol,
    title: "Бензин",
    description: "Полный бак на любой заправке города за наш счёт",
    btnClassName: "button button_middle button_theme_red",
  },
  {
    image: service,
    title: "Обслуживание",
    description: "Автомобиль проходит еженедельное ТО",
    btnClassName: "button button_middle button_theme_violet",
  },
];

export const API_URL = "http://api-factory.simbirsoft1.com/api";
export const HEADERS = {
  "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b",
  Authorization: "Bearer 52efbe08228671240494f537f2486bc109a637b4",
};

export const API_KEY_YANDEX_MAP = "434c60eb-7e25-434d-8607-ff46d664dc87";
export const API_URL_YANDEX_MAP =
  "https://geocode-maps.yandex.ru/1.x/?format=json";
