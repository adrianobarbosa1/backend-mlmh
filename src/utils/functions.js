const moment = require('moment');
// eslint-disable-next-line import/no-extraneous-dependencies
const uuidv4 = require('uuid');
const fs = require('fs');

const gerarProtocolo = () => {
  let hex = uuidv4();
  hex = hex.slice(31);
  const protocoloRandom = `${moment().format('DDhhss').toString()}${hex}`;
  return protocoloRandom.toUpperCase();
};

const createWriteTxtProtocol = async (register) => {
  const protocolos = register;

  const linhasPorTxt = 500;
  const numeroTxt = Math.ceil(protocolos.length / linhasPorTxt);
  const arrayTxt = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numeroTxt; i++) {
    const arrayNovo = protocolos.slice(0, linhasPorTxt);
    arrayTxt.push(arrayNovo);
    protocolos.splice(0, linhasPorTxt);
  }

  arrayTxt.forEach((arquivoTxts, index) => {
    arquivoTxts.forEach((linhaProtocol) => {
      const { protocolo: protocol, fone_celular: foneCelular } = linhaProtocol;

      const newfone = foneCelular.replace(/[^\d]+/g, '');
      const zap = `55${newfone}`;
      const textZap = `${zap};${protocol}\n`;
      fs.writeFile(
        `./zapAndProtocol/${index}.txt`,
        textZap,
        {
          flag: 'a',
        },
        (err) => {
          if (err) {
            console.log(err);
            return false;
          }
        }
      );
    });
  });
  return true;
};

module.exports = {
  gerarProtocolo,
  createWriteTxtProtocol,
};
