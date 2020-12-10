export const makeDisplayNumber = (carNumber) => {
  const displayNumber = `${carNumber
    .substr(0, 1)
    .toUpperCase()} ${carNumber.substr(1, 3)} ${carNumber
    .substr(4, 2)
    .toUpperCase()}`;
  return displayNumber;
};
