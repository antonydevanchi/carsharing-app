export const makePriceWithGap = (price) => {
  let priceWithGap;
  if (price >= 1000) {
    const integer = parseInt(price / 1000, 10);
    if (price % 1000 === 0) {
      priceWithGap = `${integer} 000`;
    } else {
      const float = (price / 1000 - integer).toFixed(3) * 1000;
      priceWithGap = `${integer} ${float} `;
    }
  } else {
    priceWithGap = price;
  }
  return priceWithGap;
};
