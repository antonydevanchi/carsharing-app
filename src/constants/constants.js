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
export const HEADERS_POST = {
  "X-Api-Factory-Application-Id": "5e25c641099b810b946c5d5b",
  Authorization: "Bearer 52efbe08228671240494f537f2486bc109a637b4",
  "Content-type": "application/json",
};
export const API_ID = "5e25c641099b810b946c5d5b";
export const URL_SIMBIRSOFT =
  "https://cors-anywhere.herokuapp.com/http://api-factory.simbirsoft1.com/";

export const API_KEY_YANDEX_MAP = "434c60eb-7e25-434d-8607-ff46d664dc87";
export const API_URL_YANDEX_MAP =
  "https://geocode-maps.yandex.ru/1.x/?format=json";

export const FULL_TANK_PRICE = 500;
export const BABY_CHAIR_PRICE = 200;
export const RIGHT_HAND_PRICE = 1600;

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

export const dateMask = [
  /[0-3]/,
  /\d/,
  ".",
  /[0-1]/,
  /\d/,
  ".",
  "2",
  "0",
  "2",
  /\d/,
  " ",
  /[0-2]/,
  /\d/,
  ":",
  /[0-5]/,
  /\d/,
];

export const ORDER_STATUS_NEW_ID = "5e26a191099b810b946c5d89";
export const ORDER_STATUS_ISSUED_ID = "5e26a1d5099b810b946c5d8a";
export const ORDER_STATUS_CONFIRMED_ID = "5e26a1f0099b810b946c5d8b";
export const ORDER_STATUS_CANCELLED_ID = "5e26a1f5099b810b946c5d8c";

export const SECRET = ":4cbcea96de";

export const CARS = [
  {
    name: "car 1",
    id: "11111",
    category: "11111",
    price: "11111",
    other: "11111",
  },
  {
    name: "car 2",
    id: "11111",
    category: "11111",
    price: "11111",
    other: "11111",
  },
  {
    name: "car 3",
    id: "11111",
    category: "11111",
    price: "11111",
    other: "11111",
  },
  {
    name: "car 4",
    id: "11111",
    category: "11111",
    price: "11111",
    other: "11111",
  },
  {
    name: "car 5",
    id: "11111",
    category: "11111",
    price: "11111",
    other: "11111",
  },
  {
    name: "car 6",
    id: "11111",
    category: "11111",
    price: "11111",
    other: "11111",
  },
];
export const ORDERS = [
  {
    name: "order 1",
    id: "22222",
    category: "22222",
    price: "22222",
    other: "22222",
  },
  {
    name: "order 2",
    id: "22222",
    category: "22222",
    price: "22222",
    other: "22222",
  },
  {
    name: "order 3",
    id: "22222",
    category: "22222",
    price: "22222",
    other: "22222",
  },
  {
    name: "order 4",
    id: "22222",
    category: "22222",
    price: "22222",
    other: "22222",
  },
  {
    name: "order 6",
    id: "22222",
    category: "22222",
    price: "22222",
    other: "22222",
  },
];
