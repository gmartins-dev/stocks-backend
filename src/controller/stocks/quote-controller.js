const express = require('express');
const axios = require('axios');
const statusCodes = require('../../utils/statusCodes');
const getKeyForObject = require('../../utils/getKeyForObject');
const getLatestPrice = require('../../services/stocks/quote-services');

module.exports = {
  async quote(req, res) {
    try {
      let uri = `/query?`;
      uri += `function=TIME_SERIES_INTRADAY&`;
      uri += `symbol=${req.params.stock_name}&interval=5min&`;
      uri += `apikey=${process.env.API_KEY}`;

      const quote = await axios.get(process.env.API_BASE + uri, {
        json: true,
        headers: { 'User-Agent': 'request' },
      });

      const keyTimeSeries = getKeyForObject(quote.data);
      const responseFn = getLatestPrice(quote.data, req.params.stock_name, keyTimeSeries);

      return res.status(statusCodes.OK).json(responseFn);
    } catch (err) {
      return res.status(statusCodes.BAD_REQUEST).json(err);
    }
  },
};
