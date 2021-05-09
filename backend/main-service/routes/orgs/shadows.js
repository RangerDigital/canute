const ShadowService = require('../../services/orgs/ShadowService');

async function routes(router) {
  router.register(require('../../hooks/adminHook'));

  router.get(
    '/',
    {
      schema: {
        summary: 'Get shadows.',
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
                class: { type: 'string' },
                topic: { type: 'string' },
              },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { orgId } = req.params;

      const shadows = await ShadowService.get(orgId);

      res.send(shadows);
    }
  );
}

module.exports = routes;
