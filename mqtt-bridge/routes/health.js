const mqtt = require('../mqtt');
const devices = require('../models/devices');

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
      let errors = false;
      let response = {};

      if (mqtt.connected() === true) {
        response['mqtt'] = 'connected';
      } else {
        response['mqtt'] = 'error';
        errors = true;
      }

      try {
        await devices.findOne();
        response['mongo'] = 'connected';
      } catch {
        response['mongo'] = 'error';
        errors = true;
      }

      if (errors) {
        return res.code(503).send(response);
      }

      return res.send(response);
    }
  );
}

module.exports = routes;
