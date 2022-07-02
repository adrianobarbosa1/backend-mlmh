const moment = require('moment');
// eslint-disable-next-line import/no-extraneous-dependencies
const uuidv4 = require('uuid');

const protocolo = () => {
  let hex = uuidv4();
  hex = hex.slice(31);
  const protocoloRandom = `${moment().format('DDhhss').toString()}${hex}`;
  return protocoloRandom.toUpperCase();
};

module.exports = protocolo;
