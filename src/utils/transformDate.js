function makeTwoDigitNumber(number) {
  let twoDigitNumber;
  if (number <= 9) {
    twoDigitNumber = `0${number}`;
  } else twoDigitNumber = number;
  return twoDigitNumber;
}

export const transformDate = (milliseconds) => {
  const date = new Date(milliseconds);
  const day = makeTwoDigitNumber(date.getDate());
  const month = makeTwoDigitNumber(date.getMonth() + 1);
  const hour = makeTwoDigitNumber(date.getHours());
  const min = makeTwoDigitNumber(date.getMinutes());

  const transformedDate = `${day}.${month}.${date.getFullYear()} ${hour}:${min}`;
  return transformedDate;
};
