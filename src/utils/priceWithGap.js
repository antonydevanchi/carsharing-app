export const makePriceWithGap = (price) => {
  let priceWithGap;
  if (price >= 1000) {
    const integer = parseInt(price / 1000, 10);
    if (price % 1000 === 0) {
      priceWithGap = `${integer} 000`;
    } else {
      const float = (price / 1000 - integer).toFixed(3) * 1000 + "";
      if (float.length === 2) {
        priceWithGap = `${integer} 0${float}`;
      } else if (float.length === 1) {
        priceWithGap = `${integer} 00${float}`;
      } else priceWithGap = `${integer} ${float}`;
    }
  } else {
    priceWithGap = price;
  }
  return priceWithGap;
};
