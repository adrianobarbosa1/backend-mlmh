const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');

const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text, html) => {
  const msg = {
    from: config.email.from,
    to,
    subject,
    text,
    html,
  };
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, token) => {
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
  const html = `text`;
  await sendEmail(to, subject, text, html);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  const subject = 'Email Verification';
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
  const html = `text`;
  await sendEmail(to, subject, text, html);
};

const sendProtocolo = async (to, name, protolo) => {
  const subject = 'Protocol Meu Lote Minha História';
  const text = 'Não responda esse email';
  const html = `<div>
  <table
    cellspacing="0"
    cellpadding="0"
    border="0"
    align="center"
    bgcolor="#ffffff"
    width="600"
    class="m_7264933685404070165email-container"
    style="
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      margin: 0 auto !important;
    "
  >
    <tbody>
      <tr>
        <td>
          <center style="background: #0693e3;">
            <img
              src="https://www.anapolis.go.gov.br/wp-content/uploads/2021/02/cropped-anapolis.png"
              alt="logo prefeitura"
              style="
                display: block;
                padding: 40px 20px 10px 20px;
                text-align: center;
                border: 0px solid transparent;
                height: 43px;
                width: 120px;
              "
              width="120"
              height="43"
              class="CToWUd"
            />
          </center>
        </td>
      </tr>

      <tr>
        <td
          style="
            padding: 40px;
            text-align: left;
            font-family: sans-serif;
            font-size: 15px;
            line-height: 20px;
            color: #555555;
          "
        >
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <p>
                          <strong>Olá, ${name}!</strong><br /><br />
                          Você se cadastrou no programa
                          <strong>Meu lote minha história</strong>, esse é o seu
                          número de protocolo. <br /><br />
                          <h1 style="color: #3182ce; text-align: center;">${protolo}</h1>
                          A inscrição no Programa
                          <strong>MEU LOTE MINHA HISTÓRIA</strong> seguirá
                          <strong
                            >EDITAL DE CHAMAMENTO PÚBLICO Nº xxx/2022</strong
                          >
                          de acordo com Lei Complementar Municipal nº 493, de 19
                          de maio de 2022. A pessoa que for desclassificada por
                          apresentar dados, informações, declarações ou documentos
                          falsos, não poderá participar de outras inscrições do
                          Programa “Meu Lote, Minha História. <br /><br /><br />
                          <font
                            size="1"
                            >Pra saber mais sobre o funcionamento do programa Meu
                            lote minha historia, leia o
                            <a
                              href="https://image.comunicacao.bancointer.com.br/lib/fe3b15707564057f721776/m/4/CC039_2_TERMO_DE_ADESAO_E_CONDICOES_GERAIS_DO_PROGRAMA_DE_CASHBACK_3.pdf"
                              target="_blank"
                              data-saferedirecturl="https://www.google.com/url?q=https://image.comunicacao.bancointer.com.br/lib/fe3b15707564057f721776/m/4/CC039_2_TERMO_DE_ADESAO_E_CONDICOES_GERAIS_DO_PROGRAMA_DE_CASHBACK_3.pdf&amp;source=gmail&amp;ust=1656866852821000&amp;usg=AOvVaw1i6Q9yQ8iFtUk-36RuoxPu"
                              >EDITAL</a
                            >.</font
                          >
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <span><b>ANÁPOLIS, orgulho de viver aqui.</b></span>
          <br />
        </td>
      </tr>
    </tbody>
  </table>
  </div>`;
  await sendEmail(to, subject, text, html);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendProtocolo,
};
