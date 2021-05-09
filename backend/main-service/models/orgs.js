const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: String,
  address: String,
  members: [{ _userId: { type: mongoose.Types.ObjectId }, isAdmin: { type: Boolean, default: false }, annotation: String }],
  roles: [{ name: String, permissions: [mongoose.Types.ObjectId], members: [mongoose.Types.ObjectId] }],
});

schema.virtual('members.user', {
  ref: 'user',
  localField: 'members._userId',
  foreignField: '_id',
  justOne: true,
});

// schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('org', schema);
