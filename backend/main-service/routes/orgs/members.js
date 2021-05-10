const MemberService = require('../../services/orgs/MemberService');

async function routes(router) {
  router.register(require('../../hooks/adminHook'));

  router.get(
    '/',
    {
      schema: {
        summary: "Get all organisation's members.",
        tags: ['Members'],
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
                _userId: { type: 'string' },
                email: { type: 'string' },
                isAdmin: { type: 'boolean' },
                annotation: { type: 'string' },
                roles: { type: 'array' },
              },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { orgId } = req.params;

      const members = await MemberService.get(orgId);

      res.send(members);
    }
  );

  router.get(
    '/:memberId',
    {
      schema: {
        summary: "Get the specific organisation's member by ID.",
        tags: ['Members'],
        security: [{ BearerAuth: [] }],

        params: {
          type: 'object',
          properties: {
            orgId: { type: 'string' },
            memberId: { type: 'string' },
          },
        },

        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              _userId: { type: 'string' },
              email: { type: 'string' },
              isAdmin: { type: 'boolean' },
              annotation: { type: 'string' },
              roles: { type: 'array' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { orgId, memberId } = req.params;

      const member = await MemberService.getOne(orgId, memberId);

      res.send(member);
    }
  );

  router.patch(
    '/:memberId',
    {
      schema: {
        summary: "Update the specific organisation's member by ID.",
        tags: ['Members'],
        security: [{ BearerAuth: [] }],

        params: {
          type: 'object',
          properties: {
            orgId: { type: 'string' },
            memberId: { type: 'string' },
          },
        },

        body: {
          type: 'object',
          properties: {
            annotation: { type: 'string' },
            isAdmin: { type: 'boolean' },
          },
          required: ['annotation', 'isAdmin'],
        },

        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              _userId: { type: 'string' },
              email: { type: 'string' },
              isAdmin: { type: 'boolean' },
              annotation: { type: 'string' },
              roles: { type: 'array' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { orgId, memberId } = req.params;
      const { annotation, isAdmin } = req.body;

      const member = await MemberService.update(orgId, memberId, annotation, isAdmin);

      res.send(member);
    }
  );

  router.post(
    '/',
    {
      schema: {
        summary: 'Add a new member to the organisation.',
        tags: ['Members'],
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
            email: { type: 'string' },
            annotation: { type: 'string' },
            isAdmin: { type: 'boolean' },
            locale: { type: 'string' },
          },
          required: ['email', 'annotation', 'isAdmin', 'locale'],
        },

        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              _userId: { type: 'string' },
              email: { type: 'string' },
              isAdmin: { type: 'boolean' },
              annotation: { type: 'string' },
              roles: { type: 'array' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { orgId } = req.params;
      const { email, annotation, isAdmin, locale } = req.body;

      const member = await MemberService.create(orgId, email, annotation, isAdmin, locale);

      res.send(member);
    }
  );

  router.delete(
    '/:memberId',
    {
      schema: {
        summary: "Delete the specific organisation's member by ID.",
        tags: ['Members'],
        security: [{ BearerAuth: [] }],

        params: {
          type: 'object',
          properties: {
            orgId: { type: 'string' },
            memberId: { type: 'string' },
          },
        },

        response: {
          204: {},
        },
      },
    },
    async (req, res) => {
      const { orgId, memberId } = req.params;

      await MemberService.delete(orgId, memberId);

      res.code(204).send('');
    }
  );
}

module.exports = routes;
