import {
  FULL_TANK_PRICE,
  BABY_CHAIR_PRICE,
  RIGHT_HAND_PRICE,
} from "../constants/constants";

export function formateDate(date) {
  const day = date.substr(0, 2);
  const month = date.substr(3, 2);
  const year = date.substr(6, 4);
  const hour = date.substr(-5, 2);
  const minute = date.substr(-2, 2);

  const formattedDate = new Date(year, month - 1, day, hour, minute);
  return formattedDate;
}

function getMinsDuration(firstDate, secondDate) {
  const start = formateDate(firstDate);
  const end = formateDate(secondDate);
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

function getEstimatedPrice(firstDate, secondDate, rate, rates) {
  const minsDuration = getMinsDuration(firstDate, secondDate);
  const daysDuration = minsDuration / 60 / 24;
  let price;
  if (rate === "Поминутно") {
    const minsRate = rates.find((item) => {
      return item.type === rate;
    });
    price = minsDuration.toFixed() * minsRate.price;
  } else if (rate === "На сутки") {
    const daysRate = rates.find((item) => {
      return item.type === rate;
    });
    Number.isInteger(daysDuration)
      ? (price = daysDuration * daysRate.price)
      : (price = (parseInt(daysDuration) + 1) * daysRate.price);
  } else price = undefined;
  return price;
}

export const estimatePrice = (
  firstDate,
  secondDate,
  rate,
  otherServices,
  rates
) => {
  const price = getEstimatedPrice(firstDate, secondDate, rate, rates);
  let totalPrice = price;
  if (otherServices && price) {
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
