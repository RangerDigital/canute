const app = (fastify = require('fastify')({
  logger: { level: 'warn' },
}));

app.register(require('fastify-helmet'), { contentSecurityPolicy: false });
app.register(require('fastify-swagger'), {
  routePrefix: '/docs',
  exposeRoute: true,

  openapi: {
    info: {
      title: 'Canute - API Service',
      description: '🔒 Multi-family building internet-connected access control system.',
      version: '0.1.0',
    },
    tags: [
      { name: 'Roles', description: '⚔️ Role management endpoints.' },
      { name: 'Users', description: '👱 User management endpoints.' },
      { name: 'Auth', description: '🔒 User authentication endpoints.' },
      { name: 'Devices', description: '📡 Device management endpoints.' },
      { name: 'Members', description: '💖 Member management endpoints.' },
      { name: 'Shadows', description: '📋 Shadow management endpoints.' },
      { name: 'Organisations', description: '🏠 Organisation management endpoints.' },
    ],
    servers: [
      { url: 'http://127.0.0.1:3000', description: 'Development' },
      { url: 'https://canute.bednarski.dev/api', description: 'Production' },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
  },
});

const users = require('./routes/users');
const auth = require('./routes/auth');
const orgs = require('./routes/orgs');

app.register(users, { prefix: '/users' });
app.register(auth, { prefix: '/auth' });
app.register(orgs, { prefix: '/orgs' });

module.exports = app;
