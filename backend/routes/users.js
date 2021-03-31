const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');
const users = require('../models/users');

router.get('/me', checkAuth, async (req, res) => {
  let user = await users.findById(req.userId).select('-auth');

  res.json(user);
});

router.patch('/me', checkAuth, async (req, res) => {
  const { email } = req.body;

  let user = await users.findByIdAndUpdate(req.userId, { email: email }, { new: true });

  res.json(user);
});

module.exports = router;
