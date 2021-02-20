const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: String,
  users: [{ _userId: { type: mongoose.Types.ObjectId, unique: true }, isAdmin: { type: Boolean, default: false }, notes: String }],
  roles: [{ name: String, permissions: [mongoose.Types.ObjectId], users: [mongoose.Types.ObjectId] }],
});

schema.virtual('users.user', {
  ref: 'user',
  localField: 'users._userId',
  foreignField: '_id',
  justOne: true,
});

// schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('org', schema);
