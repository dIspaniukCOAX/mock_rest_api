const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  f_name: { type: String, required: true },
  l_name: { type: String, required: true },
  lead_name: { type: String, required: false },
  lead_email: { type: String, required: true },
  lead_region: { type: String, required: true },
  lead_service: { type: String, required: true },
  lead_source: { type: String, required: true },
});

module.exports = mongoose.model('leads', leadSchema);