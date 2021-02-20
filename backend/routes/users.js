const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const checkAuth = require('../middleware/checkAuth');
const users = require('../models/users');

router.get(
  '/me',
  checkAuth,
  asyncHandler(async (req, res) => {
    let user = await users.findById(req.userId).select('-auth');

    res.json(user);
  })
);

router.patch(
  '/me',
  checkAuth,
  asyncHandler(async (req, res) => {
    const { name, email } = req.body;

    let user = await users.findByIdAndUpdate(req.userId, { name: name, email: email }, { new: true });

    res.json(user);
  })
);

module.exports = router;
