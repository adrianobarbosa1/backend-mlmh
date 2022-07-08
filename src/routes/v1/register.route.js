const express = require('express');
const validate = require('../../middlewares/validate');
const registerValidation = require('../../validations/register.validation');
const registerController = require('../../controllers/register.controller');

const router = express.Router();

router.route('/').post(validate(registerValidation.createRegister), registerController.createRegister);
router.route('/zapandprotocolo').get(validate(registerValidation.sendZapAndProtocol), registerController.sendZapAndProtocol);

router.route('/:cpf').get(validate(registerValidation.getCpf), registerController.getCpf);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Register
 *   description: Cadastro do cliente
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Create a register form
 *     description: create register.
 *     tags: [Register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - cpf
 *              - nome
 *              - email
 *              - rg
 *              - uf_rg
 *              - dt_nascimento
 *              - fone_celular
 *              - sexo
 *              - portador_pcd
 *              - estado_civil
 *              - nacionalidade
 *              - cep
 *              - logradouro
 *              - bairro
 *              - localidade
 *              - uf
 *              - reside_ano
 *              - renda_bruta
 *              - cadunico
 *              - possui_imovel
 *              - contemplado_habitacional
 *              - comprador_imovel
 *              - arrimo_familia
 *              - vitima_violencia
 *              - grupo_familiar
 *             properties:
 *               cpf:
 *                 type: string
 *                 description: must be unique
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               rg:
 *                 type: string
 *               uf_rg:
 *                 type: string
 *               dt_nascimento:
 *                 type: string
 *               fone_celular:
 *                 type: string
 *               sexo:
 *                 type: string
 *               portador_pcd:
 *                 type: string
 *               estado_civil:
 *                 type: string
 *               nacionalidade:
 *                 type: string
 *               cep:
 *                 type: string
 *               logradouro:
 *                 type: string
 *               bairro:
 *                 type: string
 *               localidade:
 *                 type: string
 *               uf:
 *                 type: string
 *               reside_ano:
 *                 type: string
 *               renda_bruta:
 *                 type: string
 *               cadunico:
 *                 type: string
 *               possui_imovel:
 *                 type: string
 *               contemplado_habitacional:
 *                 type: string
 *               comprador_imovel:
 *                 type: string
 *               arrimo_familia:
 *                 type: string
 *               vitima_violencia:
 *                 type: string
 *               grupo_familiar:
 *                 type: string
 *             example:
 *               cpf: 000.000.000-00
 *               nome: fake name
 *               email: fake@example.com
 *               rg: fake number
 *               uf_rg: UF
 *               dt_nascimento: 1987-12-27
 *               fone_celular: '62999999999'
 *               sexo: masculino
 *               portador_pcd: sim
 *               estado_civil: solteiro
 *               nacionalidade: brasileiro
 *               cep: '75085850'
 *               logradouro: rua 10
 *               bairro: boa vista
 *               localidade: anapolis
 *               uf: go
 *               reside_ano: '2'
 *               renda_bruta: '2000'
 *               cadunico: sim
 *               possui_imovel: não
 *               contemplado_habitacional: não
 *               comprador_imovel: não
 *               arrimo_familia: não
 *               vitima_violencia: não
 *               grupo_familiar: não
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /register/{cpf}:
 *   get:
 *     summary: Get a user
 *     description: Logged in users can fetch only their own user information. Only admins can fetch other users.
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
