const httpStatus = require('http-status');
const pick = require('../utils/pick');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { registerService, smsService, tokenService } = require('../services');

const createRegister = catchAsync(async (req, res) => {
  const { protocolo } = await registerService.createRegister(req.body);
  // await emailService.sendProtocolo(req.body.email, req.body.nome, protocolo);
  await smsService.sendProtocolSms(req.body.fone_celular, req.body.nome, protocolo);
  res.status(httpStatus.CREATED).json({ protocolo });
});

const updateRegister = catchAsync(async (req, res) => {
  console.log(req);
  // const user = await userService.updateUserById(req.params.userId, req.body);
  // res.send(user);
  res.status(httpStatus.CREATED).json({ message: 'ok' });
});

const loginProtocolo = catchAsync(async (req, res) => {
  const { protocolo } = req.body;
  const user = await registerService.loginWithProtocol(protocolo);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
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

const sendSms = catchAsync(async (req, res) => {
  // await smsService.sendProtocolSms();
  // await registerService.postSms();
  res.status(httpStatus.CREATED).json({ message: 'ok' });
});

module.exports = {
  createRegister,
  updateRegister,
  getRegisters,
  getCpf,
  sendZapAndProtocol,
  sendSms,
  loginProtocolo,
};
