const httpStatus = require('http-status');
const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { registerService, emailService } = require('../services');

const createRegister = catchAsync(async (req, res) => {
  const { protocolo } = await registerService.createRegister(req.body);
  await emailService.sendProtocolo(req.body.email, req.body.nome, protocolo);
  res.status(httpStatus.CREATED).json({ protocolo });
});

const getCpf = catchAsync(async (req, res) => {
  await registerService.getCpfIfExist(req.params.cpf);
  res.send();
});

const getRegisters = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await registerService.queryRegisters(filter, options);
  res.send(result);
});

const sendZapAndProtocol = catchAsync(async (req, res) => {
  await registerService.getZapAndProtocol();
  res.status(httpStatus.CREATED).send();
});

module.exports = {
  createRegister,
  getRegisters,
  getCpf,
  sendZapAndProtocol,
};
