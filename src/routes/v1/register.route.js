const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const registerValidation = require('../../validations/register.validation');
const registerController = require('../../controllers/register.controller');

const router = express.Router();

router
  .route('/')
  .post(validate(registerValidation.createRegister), registerController.createRegister)
  .get(auth('getRegisters'), validate(registerValidation.getRegisters), registerController.getRegisters);

router.route('/:cpf').get(validate(registerValidation.getCpf), registerController.getCpf);

module.exports = router;
