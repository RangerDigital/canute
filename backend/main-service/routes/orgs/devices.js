const DeviceService = require('../../services/orgs/DeviceService');

async function routes(router) {
  router.register(require('../../hooks/adminHook'));

  router.get(
    '/',
    {
      schema: {
        summary: "Get all organisation's devices.",
        tags: ['Devices'],
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
                shadows: { type: 'array' },
                initialised: { type: 'string' },
              },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { orgId } = req.params;

      let devices = await DeviceService.get(orgId);

      res.send(devices);
    }
  );

  router.get(
    '/:deviceId',
    {
      schema: {
        summary: "Get the specific organisation's device by ID.",
        tags: ['Devices'],
        security: [{ BearerAuth: [] }],

        params: {
          type: 'object',
          properties: {
            orgId: { type: 'string' },
            deviceId: { type: 'string' },
          },
        },

        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              name: { type: 'string' },
              online: { type: 'boolean' },
              shadows: { type: 'array' },
              initialised: { type: 'string' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { orgId, deviceId } = req.params;

      let device = await DeviceService.getOne(orgId, deviceId);

      res.send(device);
    }
  );

  router.delete(
    '/:deviceId',
    {
      schema: {
        summary: "Delete the specific organisation's device by ID.",
        tags: ['Devices'],
        security: [{ BearerAuth: [] }],

        params: {
          type: 'object',
          properties: {
            orgId: { type: 'string' },
            deviceId: { type: 'string' },
          },
        },

        response: {
          204: {},
        },
      },
    },
    async (req, res) => {
      const { orgId, deviceId } = req.params;

      await DeviceService.deleteOne(orgId, deviceId);

      res.code(204).send('');
    }
  );

  router.post(
    '/',
    {
      schema: {
        summary: 'Create a new device in this organisation.',
        tags: ['Devices'],
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
          },
          required: ['name'],
        },

        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              name: { type: 'string' },
              online: { type: 'boolean' },
              shadows: { type: 'array' },
              initialised: { type: 'string' },
              auth: { type: 'object', properties: { username: { type: 'string' }, password: { type: 'string' } } },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { name } = req.body;
      const { orgId } = req.params;

      let device = await DeviceService.create(orgId, name);

      res.send(device);
    }
  );

  router.patch(
    '/:deviceId',
    {
      schema: {
        summary: "Update the specific organisation's device by ID.",
        tags: ['Devices'],
        security: [{ BearerAuth: [] }],

        params: {
          type: 'object',
          properties: {
            orgId: { type: 'string' },
            deviceId: { type: 'string' },
          },
        },

        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
          required: ['name'],
        },

        response: {
          200: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              name: { type: 'string' },
              online: { type: 'boolean' },
              shadows: { type: 'array' },
              initialised: { type: 'string' },
            },
          },
        },
      },
    },
    async (req, res) => {
      const { name } = req.body;
      const { orgId, deviceId } = req.params;

      let device = await DeviceService.updateName(orgId, deviceId, name);

      res.send(device);
    }
  );
}

module.exports = routes;
