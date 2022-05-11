const express = require('express');
const axios = require('axios');
const statusCodes = require('../../utils/statusCodes');
const getKeyForObject = require('../../utils/getKeyForObject');
const { getHistoryPrices } = require('../../services/stocks/history-services');

module.exports = {
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
