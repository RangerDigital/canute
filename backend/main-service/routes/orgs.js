const OrgService = require('../services/OrgService');

async function routes(router) {
  router.register(require('../hooks/authHook'));

  router.get(
    '/',
    {
      schema: {
        summary: 'Get all organisations user is a member.',
        tags: ['Organisations'],

        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                name: { type: 'string' },
                address: { type: 'string' },
                isAdmin: { type: 'boolean' },
              },
            },
          },
        },
      },
    },
    async (req, res) => {
      let organisations = await OrgService.getUserOrgs(req.userId);

      res.send(organisations);
    }
  );

  router.post(
    '/',
    {
      schema: {
        summary: 'Create a new organisation.',
        tags: ['Organisations'],

        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              name: { type: 'string' },
              members: { type: 'array' },
              address: { type: 'string' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { name, address } = req.body;

      let organisation = await OrgService.addOrg(req.userId, name, address);

      res.send(organisation);
    }
  );

  router.register(require('./orgs/admin'));

  router.register(require('./orgs/members'), { prefix: '/:orgId/members' });
  router.register(require('./orgs/roles'), { prefix: '/:orgId/roles' });
  router.register(require('./orgs/devices'), { prefix: '/:orgId/devices' });
  router.register(require('./orgs/locks'), { prefix: '/:orgId/locks' });
  router.register(require('./orgs/shadows'), { prefix: '/:orgId/shadows' });
}

module.exports = routes;
