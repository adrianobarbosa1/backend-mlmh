const Joi = require("joi");

const createRegister = {
  body: Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    cpf: Joi.string()
      .length(14)
      .required()
      .error(() => {
        return { message: "CPF Inválido." };
      }),
    rg: Joi.string()
      .required()
      .error(() => {
        return { message: "RG não pode ficar vazio" };
      }),
    orgao_emissor: Joi.string().required(),
    uf_rg: Joi.string().required(),
    dt_nascimento: Joi.date().required(),
    fone: Joi.string().required(),
    sexo: Joi.string().required(),
    estado_civil: Joi.string().required(),
    nacionalidade: Joi.string().required(),
    cep: Joi.string().required(),
    uf: Joi.string().required(),
    municipio: Joi.string().required(),
    bairro: Joi.string().optional().allow(""),
    quadra: Joi.string().optional().allow(""),
    lote: Joi.string().optional().allow(""),
    logradouro: Joi.string().required(),
    complemento: Joi.string().optional().allow(""),
    tempo_reside: Joi.string().required(),
    renda_bruta: Joi.string().required(),
    cadunico: Joi.string().required(),
    tempo_cadunico: Joi.string().optional(),
    numero_cadunico: Joi.string().optional(),
    vitima_violencia: Joi.string().required(),
    pcd: Joi.string().required(),
    grupo_familiar: Joi.string().required(),
    gf_nome: Joi.string().optional(),
    gf_cpf: Joi.string().optional(),
    gf_dt_nascimento: Joi.string().optional(),
    gf_grau_parentesco: Joi.string().optional(),
  }),
};

const getRegisters = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const update = {
  body: Joi.object().keys({
    nome: Joi.string().required(),
    cargo: Joi.string().required(),
    email: Joi.string().email().required(),
    telefone: Joi.string().allow(""),
    cpf: Joi.string().min(14).required(),
    dt_nascimento: Joi.date().required(),
    rg: Joi.string().optional().allow(""),
    uf_rg: Joi.string().optional().allow(""),
  }),
};

const remove = {
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).required(),
  }),
};

module.exports = {
  createRegister,
  getRegisters,
  remove,
};
