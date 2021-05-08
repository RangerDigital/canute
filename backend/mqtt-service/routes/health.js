const HealthService = require('../services/HealthService');

async function routes(router) {
  router.get(
    '/',
    {
      schema: {
        summary: 'Get current health status.',
        tags: ['Health'],
        response: {
          200: {
            type: 'object',
            properties: {
              mongo: { type: 'string' },
              mqtt: { type: 'string' },
            },
          },

          503: {
            type: 'object',
            properties: {
              mongo: { type: 'string' },
              mqtt: { type: 'string' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { response, errors } = await HealthService.checkStatus();

      if (errors) {
        return res.code(503).send(response);
      }

      return res.send(response);
    }
  );
}

module.exports = routes;
