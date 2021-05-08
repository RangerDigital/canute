const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const mailer = require('../mailer');
const users = require('../models/users');

class AuthService {
  async sendEmail(email, locale) {
    let user = await users.findOne({ email: email });

    if (!user) {
      user = new users({ email: email });
    }

    const magicToken = crypto.randomBytes(10).toString('hex');
    user.auth = { magicToken: magicToken, createdAt: new Date() };

    const from = process.env.MAGIC_FROM;
    const prefix = process.env.MAGIC_URL_PREFIX;

    if (locale == 'pl') {
      mailer.sendTemplate(
        'templates/magic_pl.html',
        { from: from, to: email, subject: 'Canute OS - Zaloguj Się - Kod: ' + magicToken },
        { magicToken: magicToken, magicUrlPrefix: prefix }
      );
    } else {
      mailer.sendTemplate(
        'templates/magic_en.html',
        { from: from, to: email, subject: 'Canute OS - Sign In - Code: ' + magicToken },
        { magicToken: magicToken, magicUrlPrefix: prefix }
      );
    }

    user.save();

    return true;
  }
  async validateMagic(code) {
    const user = await users.findOne({ 'auth.magicToken': code });

    if (user && new Date() - user.auth.createdAt < 300000) {
      const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1w' });

      user.auth = {};
      await user.save();

      return { success: true, token: authToken };
    }

    return { success: false };
  }
}

module.exports = new AuthService();
