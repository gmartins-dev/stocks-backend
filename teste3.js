const express = require('express');
const axios = require('axios');
const Services = require('../services/StocksServices');
// const { getKeyForObject, getLatestPrice, getHistoryPrices } = require('../services/StocksServices');

module.exports = {
  // https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=BKKG4LZ0IQ859P9X
  async quote(req, res) {
    let uri = `/query?`;
    uri += `function=TIME_SERIES_INTRADAY&`;
    uri += `symbol=${req.params.stock_name}&interval=1min&`;
    uri += `apikey=${process.env.API_KEY}`;

    const quote = await axios.get(process.env.API_BASE + uri, {
      json: true,
      headers: { 'User-Agent': 'request' },
    });

    const keyTimeSeries = getKeyForObject(quote.data);
    const responseFn = getLatestPrice(quote.data, req.params.stock_name, keyTimeSeries);

    return res.status(200).json(responseFn);
  },

  //https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=BKKG4LZ0IQ859P9X

  async history(req, res) {
    let uri = `/query?`;
    uri += `function=TIME_SERIES_MONTHLY&`;
    uri += `symbol=${req.params.stock_name}&`;
    uri += `apikey=${process.env.API_KEY}`;

    const quote = await axios.get(process.env.API_BASE + uri, {
      json: true,
      headers: { 'User-Agent': 'request' },
    });

    const keyTimeSeries = getKeyForObject(quote.data);

    const responseFn = getHistoryPrices(quote.data, req.params.stock_name, keyTimeSeries);

    return res.status(200).json(responseFn);
  },
};
