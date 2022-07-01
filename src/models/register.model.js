const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const { toJSON, paginate } = require('./plugins');

const registerSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      // unique: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    cpf: { type: String, unique: true, required: true },
    rg: { type: String, required: true },
    uf_rg: { type: String, required: true },
    dt_nascimento: { type: Date, required: true },
    fone_celular: { type: String, required: true },
    fone_fixo: { type: String },
    sexo: { type: String, required: true },
    portador_pcd: { type: String, required: true },
    estado_civil: { type: String, required: true },
    nacionalidade: { type: String, required: true },
    cep: { type: String, required: true },
    logradouro: { type: String, required: true },
    quadra: { type: String },
    lote: { type: String },
    complemento: { type: String },
    bairro: { type: String },
    localidade: { type: String, required: true },
    uf: { type: String, required: true },
    reside_ano: { type: String, required: true },
    renda_bruta: { type: String, required: true },
    cadunico: { type: String, required: true },
    numero_cadunico: { type: String },
    possui_imovel: { type: String, required: true },
    contemplado_habitacional: { type: String, required: true },
    comprador_imovel: { type: String, required: true },
    arrimo_familia: { type: String, required: true },
    vitima_violencia: { type: String, required: true },
    grupo_familiar: { type: String, required: true },
    integrantes: [
      {
        integrante: { type: Number },
        gf_nome: { type: String },
        gf_dt_nascimento: { type: String },
        gf_cpf: { type: String },
        gf_rg_certidao: { type: String },
        gf_pcd: { type: String },
        gf_parentesco: { type: String },
      },
    ],
    protocolo: { type: String, required: true },
    deletado: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
registerSchema.plugin(toJSON);
registerSchema.plugin(paginate);
registerSchema.plugin(uniqueValidator, { message: 'já está sendo utilizado' });

const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
