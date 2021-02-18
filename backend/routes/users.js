const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const authUser = require('../middleware/authUser');
const users = require('../models/users');

router.get(
  '/me',
  authUser,
  asyncHandler(async (req, res) => {
    let user = await users.findById(req.userId).select('-auth');

    res.json(user);
  })
);

router.put(
  '/me',
  authUser,
  asyncHandler(async (req, res) => {
    const payload = req.body;

    let user = await users.findByIdAndUpdate(req.userId, payload, { new: true });

    res.json(user);
  })
);

module.exports = router;
