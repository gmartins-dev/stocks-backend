//OBS CRIAR UM ARQUIVO(EXPORT/IMPORT) PARA CADA FUNCAO

//FUNCAO GLOBAL
const getKeyForObject = (responseRequest) =>
  Object.keys(responseRequest).filter((key, index) => {
    if (key.includes('Time Series')) return key;
  })[0];

module.exports = getKeyForObject;

//FUNCAO REQUEST 1
const getLatestPrice = (responseRequest, stock_name, keyListValues) => {
  //ultima data
  const date = Object.keys(responseRequest[keyListValues]).filter((key, index) => {
    if (index == 0) return key;
  })[0];

  //valor (close)
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

//FUNCAO REQUEST 2
export const getHistoryPrices = (responseRequest, stock_name, keyListValues) => {
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

module.exports = getHistoryPrices;
