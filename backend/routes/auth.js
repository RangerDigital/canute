const express = require('express');
const router = express.Router();

const handlebars = require('handlebars');
const fs = require('fs');
const crypto = require('crypto');

const mailer = require('../mailer');
const jwt = require('jsonwebtoken');
const users = require('../models/users');

router.post('/magic/request', async (req, res) => {
  const { email } = req.body;

  // Find existing user.
  let user = await users.findOne().byEmail(email).exec();

  // Create a new user.
  if (!user) {
    user = new users({ email: email });

    await user.validate().catch((err) => {
      return res.status(400).json({ msg: err });
    });
  }

  // Check for existing token.
  if (user.auth && new Date() - user.auth.createdAt < 300000) {
    return res.status(400).json({ msg: 'Old magic token is still active!' });
  }

  // Create and save Magic Token for user.
  let magicToken = crypto.randomBytes(10).toString('hex');

  user.auth = { magicToken: magicToken, createdAt: new Date() };

  // Send Magic E-Mail
  fs.readFile('templates/magic_pl.html', 'utf-8', function (err, template) {
    if (err) next(err);

    let magicTemplate = handlebars.compile(template);

    let message = {
      from: 'Canute - Logowanie <auth@mail.canute.bednarski.dev>',
      to: req.body.email,
      subject: `Twój tymczasowy kod logowania to ${magicToken}`,
      html: magicTemplate({ magicToken: magicToken, magicUrlPrefix: process.env.MAGIC_URL_PREFIX }),
    };

    mailer.sendMail(message, function (err) {
      if (err) next(err);
    });
  });

  console.log(user);
  user.save();

  res.json(user.exclude('auth'));
});

router.post('/magic/:magicToken', async (req, res) => {
  // Find existing user.
  let user = await users.findOne({ 'auth.magicToken': req.params.magicToken }).exec();

  if (!user) {
    return res.status(400).json({ msg: 'Invalid magic token!' });
  }

  if (new Date() - user.auth.createdAt > 300000) {
    return res.status(400).json({ msg: 'Expired magic token!' });
  }

  // Delete existing magic token.
  user.auth = {};
  user.save();

  let authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1w' });

  res.json({ authToken: authToken });
});

module.exports = router;
