const getLatestPrice = (responseRequest, stock_name, keyListValues) => {
  const date = Object.keys(responseRequest[keyListValues]).filter((key, index) => {
    if (index == 0) return key;
  })[0];

  const lastPriceKey = Object.keys(responseRequest[keyListValues][date]).filter((key, index) => {
    if (key.includes('close')) return key;
  })[0];

  return {
    name: stock_name,
    lastPrice: responseRequest[keyListValues][date][lastPriceKey],
    priceAt: date,
  };
};

module.exports = getLatestPrice;
