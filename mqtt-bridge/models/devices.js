const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: String,
  _orgId: mongoose.Types.ObjectId,
  auth: { clientId: String, clientToken: String },
  shadows: [{ name: String, topic: String, reported: String, class: String }],
});

module.exports = mongoose.model('device', schema);
