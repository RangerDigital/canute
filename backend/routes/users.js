const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const authUser = require('../middleware/authUser');
const users = require('../models/users');

router.get(
  '/me',
  authUser,
  asyncHandler(async (req, res) => {
    user = await users.findById(req.auth.userId).select('-auth');

    res.json(user);
  })
);

router.put(
  '/me',
  authUser,
  asyncHandler(async (req, res) => {
    const payload = req.body;
    user = await users.updateOne({ _id: req.auth.userId }, payload);

    res.json(user);
  })
);

module.exports = router;
