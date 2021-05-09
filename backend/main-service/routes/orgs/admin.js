const OrgService = require('../../services/OrgService');

async function routes(router) {
  router.register(require('../../hooks/adminHook'));

  router.get(
    '/:orgId',
    {
      schema: {
        summary: 'Get specific organisation.',
        tags: ['Organisations'],
        security: [{ BearerAuth: [] }],

        params: {
          type: 'object',
          properties: {
            orgId: { type: 'string' },
          },
        },

        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              name: { type: 'string' },
              address: { type: 'string' },
              members: { type: 'array' },
              roles: { type: 'array' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { orgId } = req.params;

      const organisation = await OrgService.getOne(orgId);
      res.send(organisation);
    }
  );

  router.patch(
    '/:orgId',
    {
      schema: {
        summary: 'Update organisation.',
        tags: ['Organisations'],
        security: [{ BearerAuth: [] }],

        params: {
          type: 'object',
          properties: {
            orgId: { type: 'string' },
          },
        },

        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            address: { type: 'string' },
          },
        },

        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              name: { type: 'string' },
              address: { type: 'string' },
              members: { type: 'array' },
              roles: { type: 'array' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { name, address } = req.body;
      const { orgId } = req.params;

      const organisation = await OrgService.updateOne(orgId, name, address);
      return res.send(organisation);
    }
  );
}

module.exports = routes;
