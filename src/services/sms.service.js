const config = require('../config/config');
const api = require('../utils/sms.api');

const sendSms = async (to, msg) => {
  const resp = await api
    .post(
      '/send-sms',
      {
        sendSmsRequest: {
          from: 'Remetente',
          to: `55${to}`,
          msg,
        },
      },
      {
        auth: {
          username: config.sms.user,
          password: config.sms.pass,
        },
      }
    )
    .then((response) => {
      return response.data.sendSmsResponse.statusDescription;
    })
    .catch((e) => {
      console.log(e);
    });
  return resp;
};

const sendProtocolSms = async (to, nome, protocolo) => {
  const msg = `Olá, ${nome},
  Seu cadastro foi realizado com sucesso , esse é o número do seu Protocolo: ${protocolo}`;
  const resp = await sendSms(to, msg);
  return resp;
};

module.exports = {
  sendSms,
  sendProtocolSms,
};
