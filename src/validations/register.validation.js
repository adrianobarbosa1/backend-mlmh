const { validator } = require('cpf-cnpj-validator');
const Joi = require('joi').extend(validator);

const createRegister = {
  body: Joi.object().keys({
    nome: Joi.string().required(),
    email: Joi.string().email().required(),
    cpf: Joi.document().cpf(),
    rg: Joi.string()
      .required()
      .error(() => {
        return { message: 'RG não pode ficar vazio' };
      }),
    uf_rg: Joi.string().required(),
    dt_nascimento: Joi.date().required(),
    fone_celular: Joi.string().required(),
    fone_fixo: Joi.string().optional(),
    sexo: Joi.string().required(),
    portador_pcd: Joi.string().required(),
    estado_civil: Joi.string().required(),
    nacionalidade: Joi.string().required(),
    cep: Joi.string().required(),
    logradouro: Joi.string().required(),
    quadra: Joi.string().optional().allow(''),
    lote: Joi.string().optional().allow(''),
    complemento: Joi.string().optional().allow(''),
    bairro: Joi.string().optional().allow(''),
    municipio: Joi.string().required(),
    uf: Joi.string().required(),
    reside_ano: Joi.string().required(),
    renda_bruta: Joi.string().required(),
    cadunico: Joi.string().required(),
    numero_cadunico: Joi.string().optional(),
    possui_imovel: Joi.string().required(),
    contemplado_habitacional: Joi.string().required(),
    comprador_imovel: Joi.string().required(),
    arrimo_familia: Joi.string().required(),
    vitima_violencia: Joi.string().required(),
    grupo_familiar: Joi.string().required(),
    integrantes: Joi.array()
      .items(
        Joi.object({
          integrante: Joi.number().optional().allow(''),
          gf_nome: Joi.string().optional().allow(''),
          gf_dt_nascimento: Joi.string().optional().allow(''),
          gf_cpf: Joi.document().cpf().optional().allow(''),
          gf_rg_certidao: Joi.string().optional().allow(''),
          gf_pcd: Joi.string().optional().allow(''),
          gf_parentesco: Joi.string().optional().allow(''),
        })
      )
      .optional()
      .allow(''),
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
    telefone: Joi.string().allow(''),
    cpf: Joi.string().min(14).required(),
    dt_nascimento: Joi.date().required(),
    rg: Joi.string().optional().allow(''),
    uf_rg: Joi.string().optional().allow(''),
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
  update,
  remove,
};
