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

export const API_URL =
  "https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/api";
export const HEADERS = {
  "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b",
  Authorization: "Bearer 52efbe08228671240494f537f2486bc109a637b4",
};
export const URL_SIMBIRSOFT =
  "https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/";

export const API_KEY_YANDEX_MAP = "434c60eb-7e25-434d-8607-ff46d664dc87";
export const API_URL_YANDEX_MAP =
  "https://geocode-maps.yandex.ru/1.x/?format=json";

export const MINUTES_PRICE = 7;
export const DAYS_PRICE = 1999;
export const FULL_TANK_PRICE = 500;
export const BABY_CHAIR_PRICE = 200;
export const RIGHT_HAND_PRICE = 1600;

export const RATES = [
  { type: "Поминутно", id: "forMinutes", price: `${MINUTES_PRICE} ₽/мин` },
  { type: "На сутки", id: "forDay", price: `${DAYS_PRICE} ₽/сутки` },
];

export const OTHERS = [
  { type: "Полный бак", id: "fullTank", price: `${FULL_TANK_PRICE}р` },
  { type: "Детское кресло", id: "babyChair", price: `${BABY_CHAIR_PRICE}р` },
  { type: "Правый руль", id: "rightHandDrive", price: `${RIGHT_HAND_PRICE}р` },
];

export const MODEL_TYPES = [
  { type: "Все модели", id: "allModels" },
  { type: "Эконом", id: "economModels" },
  { type: "Премиум", id: "premiumModels" },
];
