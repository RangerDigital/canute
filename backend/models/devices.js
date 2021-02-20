const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: String,
  _orgId: mongoose.Types.ObjectId,
  auth: { clientId: String, clientToken: String },
  acl: { publish: [String], subscribe: [String], pubsub: [String] },
  shadows: [{ name: String, topic: String, reported: String }],
});

module.exports = mongoose.model('device', schema);
