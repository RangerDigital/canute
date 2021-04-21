const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const mailer = require('../mailer');
const users = require('../models/users');

router.post('/magic', async (req, res) => {
  const { email, locale } = req.body;

  let user = await users.findOne({ email: email });

  if (!user) {
    user = new users({ email: email });
  }

  const magicToken = crypto.randomBytes(10).toString('hex');
  user.auth = { magicToken: magicToken, createdAt: new Date() };

  await user.save().catch((err) => {
    res.status(400).json({ msg: err.message });
  });

  const from = process.env.MAGIC_FROM;
  const prefix = process.env.MAGIC_URL_PREFIX;

  if (locale == 'pl') {
    mailer.sendTemplate('templates/magic_pl.html', { from: from, to: req.body.email, subject: 'Canute OS - Zaloguj Się' }, { magicToken: magicToken, magicUrlPrefix: prefix });
  } else {
    mailer.sendTemplate('templates/magic_en.html', { from: from, to: req.body.email, subject: 'Canute OS - Sign In' }, { magicToken: magicToken, magicUrlPrefix: prefix });
  }

  res.json({ msg: 'Magic token sent!' });
});

router.post('/magic/:magicToken', async (req, res) => {
  const { magicToken } = req.params;

  const user = await users.findOne({ 'auth.magicToken': magicToken });

  if (user && new Date() - user.auth.createdAt < 300000) {
    const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1w' });
    res.json({ authToken: authToken });
  } else {
    res.status(403).json({ msg: 'Invalid magic token!' });
  }

  user.auth = {};
  await user.save();
});

module.exports = router;
