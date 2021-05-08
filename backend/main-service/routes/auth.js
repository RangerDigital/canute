const AuthService = require('../services/AuthService');

async function routes(router) {
  router.post('/magic', async (req, res) => {
    const { email, locale } = req.body;

    await AuthService.sendEmail(email, locale);

    return res.send({ email: email });
  });

  router.post('/magic/:code', async (req, res) => {
    const { code } = req.params;

    const { success, token } = await AuthService.validateMagic(code);

    if (success) {
      return res.send({ authToken: token });
    }

    return res.code(403).send({ msg: 'Invalid magic token!' });
  });
}

module.exports = routes;
