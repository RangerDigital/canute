const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../mailer');

const users = require('../models/users');

router.post('/magic', async (req, res) => {
  const { email } = req.body;

  let user = await users.findOne({ email: email });

  if (!user) {
    user = new users({ email: email });
  }

  const magicToken = crypto.randomBytes(10).toString('hex');
  user.auth = { magicToken: magicToken, createdAt: new Date() };

  await user.save().catch((err) => {
    res.status(400).json({ msg: err.message });
  });

  mailer.sendTemplate(
    'templates/magic.html',
    { from: process.env.MAGIC_FROM, to: req.body.email, subject: process.env.MAGIC_SUBJECT_PREFIX + magicToken },
    { magicToken: magicToken, magicUrlPrefix: process.env.MAGIC_URL_PREFIX }
  );

  res.json({ msg: 'Magic token sent!' });
});

router.post('/magic/:magicToken', async (req, res) => {
  const { magicToken } = req.params;

  let user = await users.findOne({ 'auth.magicToken': magicToken });

  if (user && new Date() - user.auth.createdAt < 300000) {
    user.auth = {};

    let authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1w' });

    await user.save();
    res.json({ authToken: authToken });
  } else {
    res.status(403).json({ msg: 'Invalid magic token!' });
  }
});

module.exports = router;
