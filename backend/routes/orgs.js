const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const authUser = require('../middleware/authUser');
const orgs = require('../models/orgs');
const users = require('../models/users');

router.get(
  '/',
  authUser,
  asyncHandler(async (req, res) => {
    let organisations = await orgs.find({ 'users._userId': req.userId }).select('-users');

    res.json(organisations);
  })
);

router.post(
  '/',
  authUser,
  asyncHandler(async (req, res) => {
    const { name } = req.body;

    let organisation = new orgs({ name: name, users: [{ _userId: req.userId, isAdmin: true }] });
    organisation.save();

    res.json(organisation);
  })
);

router.patch(
  '/:orgId',
  authUser,
  asyncHandler(async (req, res) => {
    const { orgId } = req.params;
    const payload = req.body;

    let organisation = await orgs.findOneAndUpdate({ _id: orgId, users: { $elemMatch: { _userId: req.userId, isAdmin: true } } }, payload, { new: true });

    if (organisation) {
      res.json(organisation);
    } else {
      res.status(400).json({ msg: 'Permissions not sufficient to edit this organisation!' });
    }
  })
);

router.get(
  '/:orgId/users',
  authUser,
  asyncHandler(async (req, res) => {
    const { orgId } = req.params;

    let users = await orgs.findOne({ _id: orgId, users: { $elemMatch: { _userId: req.userId, isAdmin: true } } }).populate('users.user', '-_id -__v');
    res.json(users.users);
  })
);

router.post(
  '/:orgId/users',
  authUser,
  asyncHandler(async (req, res) => {
    const { email, notes, isAdmin } = req.body;
    const { orgId } = req.params;

    let organisation = await orgs.findOne({ _id: orgId, users: { $elemMatch: { _userId: req.userId, isAdmin: true } } });

    if (!organisation) {
      return res.status(400).json({ msg: 'Permissions not sufficient to edit this organisation!' });
    }

    let user = await users.findOne({ email: email });

    if (!user) {
      user = new users({ email: email });
      user.save();
    }

    // Check if the user already exists in this organisation.
    if (organisation.users.find((x) => String(x._userId) == String(user._id))) {
      return res.status(400).json({ msg: 'Already existing user with that E-Mail!' });
    }

    organisation.users.push({ _userId: user._id, isAdmin: isAdmin, notes: notes });
    organisation.save();

    res.json(organisation);
  })
);

router.delete(
  '/:orgId/users/:userId',
  authUser,
  asyncHandler(async (req, res) => {
    const { orgId, userId } = req.params;

    let organisation = await orgs.findOne({ _id: orgId, users: { $elemMatch: { _userId: req.userId, isAdmin: true } } });

    if (!organisation) {
      return res.status(400).json({ msg: 'Permissions not sufficient to edit this organisation!' });
    }

    organisation.users = organisation.users.filter((x) => String(x._id) !== String(userId));
    organisation.save();

    res.json(organisation);
  })
);

const devices = require('./devices');
router.use('/:orgId/devices', devices);

module.exports = router;
