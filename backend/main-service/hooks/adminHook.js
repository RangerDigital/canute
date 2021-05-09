const fp = require('fastify-plugin');
const orgs = require('../models/orgs');

module.exports = fp(function (fastify, options, next) {
  fastify.addHook('onRequest', async (req, res) => {
    const { orgId } = req.params;

    let organisation = await orgs.findOne({ _id: orgId, members: { $elemMatch: { _userId: req.userId, isAdmin: true } } });

    if (!organisation) {
      return res.code(403).send({ msg: 'Permissions not sufficient for this operation!' });
    } else {
      req.org = organisation;
      req.user = organisation.members.filter((x) => String(x._userId) === String(req.userId))[0];

      next();
    }
  });

  next();
});
