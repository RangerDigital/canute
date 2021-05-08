require('dotenv').config();

const app = (fastify = require('fastify')({
  logger: { level: 'warn' },
}));

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
      { name: 'Auth', description: '' },
      { name: 'Users', description: '' },
      { name: 'Orgs', description: '' },
    ],
  },
});

const users = require('./routes/users');
const auth = require('./routes/auth');
const orgs = require('./routes/orgs');

app.register(users, { prefix: '/users' });
app.register(auth, { prefix: '/auth' });
app.register(orgs, { prefix: '/orgs' });

module.exports = app;
