const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const logSchema = mongoose.Schema(
  {
    telefone: {
      type: String,
    },
    protocolo: { type: String, required: true },
    sent_sms: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// add plugin that converts mongoose to json
logSchema.plugin(toJSON);
logSchema.plugin(paginate);

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
