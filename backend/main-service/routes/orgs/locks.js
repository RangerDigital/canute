const ShadowService = require('../../services/orgs/ShadowService');

async function routes(router) {
  router.register(require('../../hooks/orgHook'));

  router.get(
    '/',
    {
      schema: {
        summary: 'Get locks',
        tags: ['Shadows'],
        security: [{ BearerAuth: [] }],

        params: {
          type: 'object',
          properties: {
            orgId: { type: 'string' },
          },
        },

        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                name: { type: 'string' },
                online: { type: 'boolean' },
                class: { type: 'string' },
              },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { orgId } = req.params;

      const locks = await ShadowService.getLocks(orgId, req.user._id);

      res.send(locks);
    }
  );

  router.post(
    '/:lockId',
    {
      schema: {
        summary: 'Engage the lock.',
        tags: ['Shadows'],
        security: [{ BearerAuth: [] }],

        params: {
          type: 'object',
          properties: {
            orgId: { type: 'string' },
            lockId: { type: 'string' },
          },
        },

        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              name: { type: 'string' },
            },
          },

          403: {
            type: 'object',
            properties: {
              msg: { type: 'string' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { orgId, lockId } = req.params;

      const { success, lock } = await ShadowService.engageLock(orgId, lockId, req.user._id);

      if (success) {
        return res.send(lock);
      }

      return res.code(403).send({ msg: 'Permissions not sufficient for this operation!' });
    }
  );
}

module.exports = routes;
