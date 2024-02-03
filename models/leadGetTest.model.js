const mongoose = require('mongoose');

const leadTestGetSchema = new mongoose.Schema({
  f_name: { type: String, required: true },
  l_name: { type: String, required: true },
  lead_email: { type: String, required: true },
  lead_phone: { type: String, required: true },
});

module.exports = mongoose.model('leadGetTest', leadTestGetSchema);