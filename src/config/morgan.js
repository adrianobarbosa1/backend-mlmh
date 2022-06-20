const morgan = require('morgan');
const config = require('./config');

const getIpFormat = () => (config.env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res) => res.statusCode >= 400
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res) => res.statusCode < 400
});

module.exports = {
  successHandler,
  errorHandler,
};
