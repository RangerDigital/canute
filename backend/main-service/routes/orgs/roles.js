const RoleService = require('../../services/orgs/RoleService');

async function routes(router) {
  router.register(require('../../hooks/adminHook'));

  router.get(
    '/',
    {
      schema: {
        summary: 'Get roles.',
        tags: ['Roles'],
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
                permissions: { type: 'array' },
                members: { type: 'array' },
              },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { orgId } = req.params;

      const roles = await RoleService.get(orgId);

      res.send(roles);
    }
  );

  router.get(
    '/:roleId',
    {
      schema: {
        summary: 'Get specific role',
        tags: ['Roles'],
        security: [{ BearerAuth: [] }],

        params: {
          type: 'object',
          properties: {
            orgId: { type: 'string' },
            roleId: { type: 'string' },
          },
        },

        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              name: { type: 'string' },
              permissions: { type: 'array' },
              members: { type: 'array' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { orgId, roleId } = req.params;

      const role = await RoleService.getOne(orgId, roleId);

      res.send(role);
    }
  );

  router.post(
    '/',
    {
      schema: {
        summary: 'Create role.',
        tags: ['Roles'],
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
            members: { type: 'array' },
            permissions: { type: 'array' },
          },
          required: ['name', 'members', 'permissions'],
        },

        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              name: { type: 'string' },
              permissions: { type: 'array' },
              members: { type: 'array' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { name, permissions, members } = req.body;
      const { orgId } = req.params;

      const role = await RoleService.create(orgId, name, permissions, members);

      return res.send(role);
    }
  );

  router.patch(
    '/:roleId',
    {
      schema: {
        summary: 'Update role.',
        tags: ['Roles'],
        security: [{ BearerAuth: [] }],

        params: {
          type: 'object',
          properties: {
            orgId: { type: 'string' },
            roleId: { type: 'string' },
          },
        },

        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            permissions: { type: 'array' },
          },
          required: ['name', 'permissions'],
        },

        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              name: { type: 'string' },
              permissions: { type: 'array' },
              members: { type: 'array' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { name, permissions } = req.body;
      const { orgId, roleId } = req.params;

      const role = await RoleService.update(orgId, roleId, name, permissions);

      return res.send(role);
    }
  );

  router.delete(
    '/:roleId',
    {
      schema: {
        summary: 'Delete role.',
        tags: ['Roles'],
        security: [{ BearerAuth: [] }],

        params: {
          type: 'object',
          properties: {
            orgId: { type: 'string' },
            roleId: { type: 'string' },
          },
        },

        response: {
          204: {},
        },
      },
    },
    async (req, res) => {
      const { orgId, roleId } = req.params;

      await RoleService.delete(orgId, roleId);

      res.code(204).send('');
    }
  );

  router.post(
    '/:roleId/members/:memberId',
    {
      schema: {
        summary: 'Add member to role.',
        tags: ['Roles'],
        security: [{ BearerAuth: [] }],

        params: {
          type: 'object',
          properties: {
            orgId: { type: 'string' },
            roleId: { type: 'string' },
            memberId: { type: 'string' },
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
                permissions: { type: 'array' },
                members: { type: 'array' },
              },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { orgId, roleId, memberId } = req.params;

      const roles = await RoleService.addMember(orgId, roleId, memberId);

      return res.send(roles);
    }
  );

  router.delete(
    '/:roleId/members/:memberId',
    {
      schema: {
        summary: 'Delete member from role.',
        tags: ['Roles'],
        security: [{ BearerAuth: [] }],

        params: {
          type: 'object',
          properties: {
            orgId: { type: 'string' },
            roleId: { type: 'string' },
            memberId: { type: 'string' },
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
                permissions: { type: 'array' },
                members: { type: 'array' },
              },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { orgId, roleId, memberId } = req.params;

      const roles = await RoleService.deleteMember(orgId, roleId, memberId);

      return res.send(roles);
    }
  );
}

module.exports = routes;
