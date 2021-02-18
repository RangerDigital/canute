const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isInitiated: {
    type: Boolean,
    default: false,
  },
  auth: {
    magicToken: String,
    createdAt: Date,
  },
});

schema.query.byEmail = function (email) {
  return this.findOne({ email: email });
};

module.exports = mongoose.model('user', schema);
