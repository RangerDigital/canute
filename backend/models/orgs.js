const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: {
    type: String,
  },
  users: [{ _userId: mongoose.Types.ObjectId, isAdmin: { type: Boolean, default: false }, notes: String, roles: [mongoose.Types.ObjectId] }],
  roles: [{ name: String, permissions: [mongoose.Types.ObjectId] }],
});

schema.virtual('users.user', {
  ref: 'user',
  localField: 'users._userId',
  foreignField: '_id',
  justOne: true,
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('org', schema);
