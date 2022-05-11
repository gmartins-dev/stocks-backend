const getHistoryPrices = (responseRequest, stock_name, keyListValues) => {
  const getPriceFromData = (object, keyForValue) => {
    return Object.entries(object).find(([key, value]) => key.includes(keyForValue) && value)[1];
  };
  return {
    name: stock_name,
    prices: Object.entries(responseRequest[keyListValues]).map(([key, value]) => {
      return {
        name: stock_name,
        prices: {
          opening: getPriceFromData(value, 'open'),
          low: getPriceFromData(value, 'low'),
          high: getPriceFromData(value, 'high'),
          closing: getPriceFromData(value, 'close'),
          pricedAt: key, // data no formato ISO 8601, UTC
        },
      };
    }),
  };
};

module.exports = {
  getHistoryPrices,
};
