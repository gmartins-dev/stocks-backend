const statusCodes = require('../../utils/statusCodes');
const { handleQuote } = require('../../services/stocks/quote-services');

module.exports = {
  async quote(req, res) {
    try {
      const responseFn = await handleQuote(req.params);
      return res.status(statusCodes.OK).json(responseFn);
    } catch (err) {
      return res.status(statusCodes.BAD_REQUEST).json(err);
    }
  },
};
