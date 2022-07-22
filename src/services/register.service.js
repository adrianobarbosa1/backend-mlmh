const httpStatus = require('http-status');
const { Register, Log } = require('../models');
// const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const { sendSmsMult } = require('./sms.service');
const { gerarProtocolo, createWriteTxtProtocol } = require('../utils/functions');

// const { register } = require('../validations/auth.validation');

// Create a register
const createRegister = async (registerBody) => {
  registerBody.integrantes.forEach((item) => {
    if (item.gf_cpf === registerBody.cpf) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'CPF duplicado!');
    }
  });

  const cpfExist = await Register.findOne({ cpf: registerBody.cpf });
  if (cpfExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Sua inscrição foi realizada. Favor aguardar o envio do protocolo pelos contatos informados no cadastro.'
    );
  }
  const cpfExistParente = await Register.find({ 'integrantes.gf_cpf': registerBody.cpf });
  if (cpfExistParente[0]) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Sua inscrição foi realizada. Favor aguardar o envio do protocolo pelos contatos informados no cadastro.'
    );
  }
  // eslint-disable-next-line no-param-reassign
  registerBody.protocolo = gerarProtocolo();
  return Register.create(registerBody);
};
// testando codigo
// Query for registers
const queryRegisters = async (filter, options) => {
  const registers = await Register.paginate(filter, options);
  return registers;
};

const getCpfIfExist = async (cpf) => {
  const cpfExist = await Register.findOne({ cpf });
  if (cpfExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Sua inscrição foi realizada. Favor aguardar o envio do protocolo pelos contatos informados no cadastro.'
    );
  }
  const cpfExistParente = await Register.find({ 'integrantes.gf_cpf': cpf });
  if (cpfExistParente[0]) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Sua inscrição foi realizada. Favor aguardar o envio do protocolo pelos contatos informados no cadastro.'
    );
  }
};

const loginWithProtocol = async (protocol) => {
  const userProtocol = await Register.find({ protocol });
  if (!userProtocol) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Protocolo não encontrado');
  }
  return userProtocol;
};

// Get Register by cpf
const getRegisterByCpf = async (cpf) => {
  return Register.find({ cpf });
};

const postSms = async () => {
  await Register.find({}, '_id nome fone_celular protocolo').then((registers) => {
    const arrRegister = [];

    Promise.all(
      registers.map(async (item) => {
        arrRegister.push({
          to: `55${item.fone_celular.replace(/[^\d]+/g, '')}`,
          msg: `Olá, ${item.nome},
          Seu cadastro foi realizado com sucesso, esse é o número do seu Protocolo: ${item.protocolo}`,
        });
        await Log.create({
          telefone: item.fone_celular,
          protocolo: item.protocolo,
          sent_sms: true,
        });
      })
    );
    sendSmsMult(arrRegister);
  });
};

const getZapAndProtocol = async () => {
  const register = await Register.find({}, '_id fone_celular protocolo sent_protocol');
  const idRegister = register.map((item) => item._id);
  register.forEach((item) => {
    if (!item.sent_protocol) {
      const zapSent = createWriteTxtProtocol(register);
      if (zapSent) {
        idRegister.forEach(async (id) => {
          await Register.findByIdAndUpdate({ _id: id }, { sent_protocol: true }, { new: true })
            .then((response) => {
              return response;
            })
            .catch((e) => {
              throw new ApiError(httpStatus.BAD_REQUEST, e);
            });
        });
      }
    }
  });
};

module.exports = {
  createRegister,
  queryRegisters,
  getRegisterByCpf,
  getCpfIfExist,
  getZapAndProtocol,
  postSms,
  loginWithProtocol,
};
