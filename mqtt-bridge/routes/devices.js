const AuthService = require('../services/AuthService');

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

      const success = await AuthService.checkCredentials(username, password);

      if (success) {
        return res.send({ msg: 'Access Granted!' });
      } else {
        return res.code(403).send({ msg: 'Access Denied!' });
      }
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

      const success = await AuthService.checkSuperUser(username, password);

      if (success) {
        return res.send({ msg: 'Access Granted!' });
      } else {
        return res.code(403).send({ msg: 'Access Denied!' });
      }
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

      const success = await AuthService.checkAccess(client, topic);

      if (success) {
        return res.send({ msg: 'Access Granted!' });
      } else {
        return res.code(403).send({ msg: 'Access Denied!' });
      }
    }
  );
}

module.exports = routes;
