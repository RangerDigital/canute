const users = require('../models/users');

async function routes(router) {
  router.register(require('../hooks/authHook'));

  router.get('/me', async (req, res) => {
    let user = await users.findById(req.userId).select('-auth');

    res.send(user);
  });

  router.patch('/me', async (req, res) => {
    const { email } = req.body;

    let user = await users.findByIdAndUpdate(req.userId, { email: email }, { new: true });

    res.send(user);
  });
}

module.exports = routes;
