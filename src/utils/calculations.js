import {
  MINUTES_PRICE,
  DAYS_PRICE,
  FULL_TANK_PRICE,
  BABY_CHAIR_PRICE,
  RIGHT_HAND_PRICE,
} from "../constants/constants";

function getMinsDuration(firstDate, secondDate) {
  const days = [firstDate.substr(0, 2), secondDate.substr(0, 2)];
  const months = [firstDate.substr(3, 2), secondDate.substr(3, 2)];
  const years = [firstDate.substr(6, 4), secondDate.substr(6, 4)];
  const hours = [firstDate.substr(-5, 2), secondDate.substr(-5, 2)];
  const minutes = [firstDate.substr(-2, 2), secondDate.substr(-2, 2)];

  const start = new Date(
    years[0],
    months[0] - 1,
    days[0],
    hours[0],
    minutes[0]
  );
  const end = new Date(years[1], months[1] - 1, days[1], hours[1], minutes[1]);
  const secDuration = (end - start) / 1000;
  return secDuration / 60;
}

export const getDuration = (firstDate, secondDate) => {
  const minsDuration = getMinsDuration(firstDate, secondDate);
  const hoursDuration = minsDuration / 60;
  const daysDuration = hoursDuration / 24;
  const dayInteger = parseInt(daysDuration, 10);
  const hourInteger = parseInt(hoursDuration - dayInteger * 24, 10);
  const hourFloat = hoursDuration - dayInteger * 24;

  if (daysDuration >= 1 && Number.isInteger(daysDuration)) {
    return `${daysDuration}д`;
  } else if (daysDuration >= 1 && Number.isInteger(hoursDuration)) {
    return `${dayInteger}д ${hourInteger}ч`;
  } else if (daysDuration >= 1 && !Number.isInteger(hoursDuration)) {
    return `${dayInteger}д ${hourInteger}ч ${(
      (hourFloat - hourInteger) *
      60
    ).toFixed()}мин`;
  } else if (
    daysDuration < 1 &&
    daysDuration > 0 &&
    Number.isInteger(hoursDuration)
  ) {
    return `${hourInteger}ч`;
  } else if (
    daysDuration < 1 &&
    daysDuration > 0 &&
    !Number.isInteger(hoursDuration)
  ) {
    return `${hourInteger}ч ${((hourFloat - hourInteger) * 60).toFixed()}мин`;
  } else if (
    daysDuration < 1 &&
    daysDuration > 0 &&
    hoursDuration < 1 &&
    hoursDuration > 0 &&
    minsDuration > 0
  ) {
    return `${minsDuration.toFixed()}мин`;
  }
  return undefined;
};

function getEstimatedPrice(firstDate, secondDate, rate) {
  const minsDuration = getMinsDuration(firstDate, secondDate);
  const daysDuration = minsDuration / 60 / 24;
  let price;
  if (rate === "Поминутно") {
    price = minsDuration.toFixed() * MINUTES_PRICE;
  } else if (rate === "На сутки" && Number.isInteger(daysDuration)) {
    price = daysDuration * DAYS_PRICE;
  } else {
    price = (parseInt(daysDuration) + 1) * DAYS_PRICE;
  }
  return price;
}

export const estimatePrice = (firstDate, secondDate, rate, otherServices) => {
  const price = getEstimatedPrice(firstDate, secondDate, rate);
  let totalPrice = price;
  if (otherServices) {
    otherServices.includes("Полный бак")
      ? (totalPrice += FULL_TANK_PRICE)
      : (totalPrice += 0);
    otherServices.includes("Детское кресло")
      ? (totalPrice += BABY_CHAIR_PRICE)
      : (totalPrice += 0);
    otherServices.includes("Правый руль")
      ? (totalPrice += RIGHT_HAND_PRICE)
      : (totalPrice += 0);
  }
  return totalPrice;
};

// if (price < priceMin || price > priceMax) {
//   return "Необходимо изменить длительность аренды"
// } else return price;
