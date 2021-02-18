const express = require('express');
const router = express.Router();

const authUser = require('../middleware/authUser');
const users = require('../models/users');

router.get('/me', authUser, async (req, res) => {
  res.json(await users.findById(req.userId).select('-auth'));
});

module.exports = router;
