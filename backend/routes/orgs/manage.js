async function routes(router) {
  router.register(require('../../hooks/adminHook'));

  router.get('/:orgId', async (req, res) => {
    const organisation = req.org;

    res.send(organisation);
  });

  router.patch('/:orgId', async (req, res) => {
    const { name, address } = req.body;
    const organisation = req.org;

    // TODO! It's not PATCH anymore
    organisation.name = name;
    organisation.address = address;

    organisation.save();

    res.send(organisation);
  });
}

module.exports = routes;
