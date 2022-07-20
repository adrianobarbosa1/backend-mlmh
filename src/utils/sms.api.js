const axios = require('axios');

const api = axios.create({
  baseURL: 'https://api-rest.zenvia360.com.br/services',
});

module.exports = api;
