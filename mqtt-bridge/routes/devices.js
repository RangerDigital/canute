const crypto = require('crypto');
const devices = require('../models/devices');

async function routes(router) {
  router.post(
    '/auth',
    {
      schema: {
        summary: 'Check auth for EMQ-X HTTP plugin.',
        tags: ['Auth'],
        body: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
          },
        },

        response: {
          200: {
            type: 'object',
            properties: {
              msg: { type: 'string' },
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
      const { username, password } = req.body;

      if (username == process.env.MQTT_USERNAME && password == process.env.MQTT_PASSWORD) {
        return res.send({ msg: 'Access Granted!' });
      }

      let device = await devices.findOne({ 'auth.username': username });

      if (!device) {
        return res.code(403).send({ msg: 'Access Denied!' });
      }

      if (device.auth.password == crypto.createHmac('sha512', device.auth.salt).update(password).digest('hex')) {
        return res.send({ msg: 'Access Granted!' });
      }

      return res.code(403).send({ msg: 'Access Denied!' });
    }
  );

  router.post(
    '/super',
    {
      schema: {
        summary: 'Check super auth for EMQ-X HTTP plugin.',
        tags: ['Auth'],
        body: {
          type: 'object',
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
          },
        },

        response: {
          200: {
            type: 'object',
            properties: {
              msg: { type: 'string' },
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
      const { username, password } = req.body;

      if (username == process.env.MQTT_USERNAME && password == process.env.MQTT_PASSWORD) {
        return res.send({ msg: 'Access Granted!' });
      }

      return res.code(403).send({ msg: 'Access Denied!' });
    }
  );

  router.post(
    '/acl',
    {
      schema: {
        summary: 'Check ACL for EMQ-X HTTP plugin.',
        tags: ['Auth'],
        body: {
          type: 'object',
          properties: {
            client: { type: 'string' },
            topic: { type: 'string' },
          },
        },

        response: {
          200: {
            type: 'object',
            properties: {
              msg: { type: 'string' },
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
      const { client, topic } = req.body;

      let topicLevels = topic.split('/');

      let device = await devices.findOne({ _id: client });

      if (device && client == topicLevels[1]) {
        return res.send({ msg: 'Access Granted!' });
      }

      return res.code(403).send({ msg: 'Access Denied!' });
    }
  );
}

module.exports = routes;
