const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: String,
  _orgId: mongoose.Types.ObjectId,
  auth: { username: String, password: String, salt: String },
  shadows: [{ name: String, topic: String, reported: String, class: String }],
  online: { type: Boolean, default: false },
  initialised: { type: Boolean, default: false },
});

module.exports = mongoose.model('device', schema);
