const getKeyForObject = (responseRequest) =>
  Object.keys(responseRequest).filter((key, index) => {
    if (key.includes('Time Series')) return key;
  })[0];

module.exports = getKeyForObject;
