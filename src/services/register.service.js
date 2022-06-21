const httpStatus = require('http-status');
const { Register } = require('../models');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const moment = require('moment');
const { register } = require('../validations/auth.validation');

//Create a register
const createRegister = async (registerBody) => {
  const cpfExist = await Register.findOne({ cpf: registerBody.cpf });
  if (cpfExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'CPF já está registrado!');
  }
  registerBody.protocolo = moment().format('YYYYMhmmss').toString();
  return Register.create(registerBody);
}

//Query for registers
const queryRegisters = async (filter, options) => {
  const registers = await Register.paginate(filter, options);
  return registers;
}

//Get Register by cpf
const getRegisterByCpf = async (cpf) => {
  return Register.find({ cpf: cpf });
};

module.exports = {
  createRegister,
  queryRegisters
};