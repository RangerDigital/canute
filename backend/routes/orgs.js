const orgs = require('../models/orgs');

async function routes(router) {
  router.register(require('../middleware/authHook'));

  router.get('/', async (req, res) => {
    let organisations = await orgs.find({ 'users._userId': req.userId });

    let response = [];

    // Check if a logged user is an admin in this organisation.
    for (let organisation of organisations) {
      let isAdmin = false;
      for (let user of organisation.users) {
        if (user._userId == req.userId && user.isAdmin == true) {
          isAdmin = true;
        }
      }

      // Filter out unnecessary fields.
      response.push({ _id: organisation._id, name: organisation.name, address: organisation.address, isAdmin: isAdmin });
    }

    res.send(response);
  });

  router.post('/', async (req, res) => {
    const { name, address } = req.body;

    let organisation = new orgs({ name: name, address: address, users: [{ _userId: req.userId, isAdmin: true }] });
    organisation.save();

    res.send(organisation);
  });

  // Admin Enpoints
  router.register(require('./orgsAdmin'));

  router.register(require('./roles'), { prefix: '/:orgId/roles' });
  router.register(require('./devices'), { prefix: '/:orgId/devices' });
  router.register(require('./locks'), { prefix: '/:orgId/locks' });
  router.register(require('./shadows'), { prefix: '/:orgId/shadows' });
}

module.exports = routes;
