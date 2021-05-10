const app = (fastify = require('fastify')({
  logger: true,
}));

app.register(require('fastify-formbody'));
app.register(require('fastify-swagger'), {
  routePrefix: '/docs',
  exposeRoute: true,

  openapi: {
    info: {
      title: 'Canute - MQTT Service',
      description: '🔒 Multi-family building internet-connected access control system.',
      version: '0.1.0',
    },
    tags: [
      { name: 'Auth', description: '🔒 Auth/ACL endpoint for MQTT broker.' },
      { name: 'Health', description: '💉 Health check endpoint for monitoring.' },
    ],
    servers: [
      { url: 'http://127.0.0.1:3000', description: 'Development' },
      { url: 'https://canute.bednarski.dev/api', description: 'Production' },
    ],
  },
});

const devices = require('./routes/devices');
const health = require('./routes/health');

app.register(health, { prefix: '/health' });
app.register(devices, { prefix: '/devices' });

module.exports = app;
