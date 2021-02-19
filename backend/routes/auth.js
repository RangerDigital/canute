const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

const fs = require('fs');
const mailer = require('../mailer');
const handlebars = require('handlebars');

const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const users = require('../models/users');

router.post(
  '/magic',
  asyncHandler(async (req, res) => {
    const { email } = req.body;

    let user = await users.findOne({ email: email }).exec();

    if (!user) {
      user = new users({ email: email });
    }

    await user.validate().catch((err) => {
      return res.status(400).json({ msg: err });
    });

    let magicToken = crypto.randomBytes(10).toString('hex');
    user.auth = { magicToken: magicToken, createdAt: new Date() };

    let magicTemplate = handlebars.compile(fs.readFileSync('templates/magic.html', 'utf-8'));

    let message = {
      from: process.env.MAGIC_FROM,
      to: req.body.email,
      subject: process.env.MAGIC_SUBJECT_PREFIX + magicToken,
      html: magicTemplate({ magicToken: magicToken, magicUrlPrefix: process.env.MAGIC_URL_PREFIX }),
    };

    mailer.sendMail(message);

    await user.save();
    res.json({ msg: 'Magic token sent!' });
  })
);

router.post(
  '/magic/:magicToken',
  asyncHandler(async (req, res) => {
    const { magicToken } = req.params;

    let user = await users.findOne({ 'auth.magicToken': magicToken }).exec();

    if (user && new Date() - user.auth.createdAt < 300000) {
      user.auth = {};

      let authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1w' });

      await user.save();
      res.json({ authToken: authToken });
    } else {
      res.status(403).json({ msg: 'Invalid magic token!' });
    }
  })
);

module.exports = router;
