const httpStatus = require('http-status');
const { Register } = require('../models');
// const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const protocolo = require('../utils/functions');

// const { register } = require('../validations/auth.validation');

// Create a register
const createRegister = async (registerBody) => {
  const duplicado = await registerBody.integrantes.map((item) => {
    if (item.gf_cpf === registerBody.cpf) {
      return true;
    }
    return false;
  });

  if (duplicado) throw new ApiError(httpStatus.BAD_REQUEST, 'CPF duplicado!');

  const cpfExist = await Register.findOne({ cpf: registerBody.cpf });
  if (cpfExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'CPF já está registrado!');
  }
  const cpfExistParente = await Register.find({ 'integrantes.gf_cpf': registerBody.cpf });
  if (cpfExistParente[0]) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'CPF já está registrado como integrante!');
  }
  // eslint-disable-next-line no-param-reassign
  registerBody.protocolo = protocolo();
  return Register.create(registerBody);
};

// Query for registers
const queryRegisters = async (filter, options) => {
  const registers = await Register.paginate(filter, options);
  return registers;
};

// Get Register by cpf
const getRegisterByCpf = async (cpf) => {
  return Register.find({ cpf });
};

module.exports = {
  createRegister,
  queryRegisters,
  getRegisterByCpf,
};
