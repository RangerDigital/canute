const UserService = require('../services/UserService');

async function routes(router) {
  router.register(require('../hooks/authHook'));

  router.get(
    '/me',
    {
      schema: {
        summary: 'Get currently authenticated user.',
        tags: ['Users'],

        response: {
          200: {
            type: 'object',
            properties: {
              email: { type: 'string' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const user = await UserService.get(req.userId);

      return res.send(user);
    }
  );

  router.patch(
    '/me',
    {
      schema: {
        summary: 'Update user email.',
        tags: ['Users'],
        body: {
          type: 'object',
          properties: {
            email: { type: 'string' },
          },
          required: ['email'],
        },

        response: {
          200: {
            type: 'object',
            properties: {
              email: { type: 'string' },
            },
          },
          400: {
            type: 'object',
            properties: {
              msg: { type: 'string' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { email } = req.body;

      const { success, user } = await UserService.updateEmail(req.userId, email);

      if (success) {
        return res.send(user);
      }

      return res.code(400).send({ msg: 'This email is already taken!' });
    }
  );
}

module.exports = routes;
