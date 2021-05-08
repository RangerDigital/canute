const mailer = require('../../mailer');

const orgs = require('../../models/orgs');
const users = require('../../models/users');

async function routes(router) {
  router.register(require('../../hooks/adminHook'));

  router.get('/', async (req, res) => {
    const { orgId } = req.params;

    let users = await orgs.findOne({ _id: orgId, users: { $elemMatch: { _userId: req.userId, isAdmin: true } } }).populate('users.user', '-_id -__v -auth');
    let response = [];

    // Add roles to users for this partculat organisation.
    // Need for Users frontend view.
    for (let user of users.users.toObject()) {
      let roles = [];

      for (let role of req.org.roles) {
        if (role.users.includes(user._id)) {
          roles.push({ _id: role._id, name: role.name, permissions: role.permissions });
        }
      }

      user = user;
      user.roles = roles;
      user.email = user.user.email;

      delete user.user;
      response.push(user);
    }

    res.send(response);
  });

  router.get('/:userId', async (req, res) => {
    const { orgId, userId } = req.params;

    let users = await orgs.findOne({ _id: orgId, users: { $elemMatch: { _userId: req.userId, isAdmin: true } } }).populate('users.user', '-_id -__v -auth');
    let response = [];

    // Add roles to users for this partculat organisation.
    // Need for Users frontend view.
    for (let user of users.users.toObject()) {
      let roles = [];

      for (let role of req.org.roles) {
        if (role.users.includes(user._id)) {
          roles.push({ _id: role._id, name: role.name, permissions: role.permissions });
        }
      }

      user = user;
      user.roles = roles;
      user.email = user.user.email;

      delete user.user;

      response.push(user);
    }

    response = response.filter((x) => String(x._id) == String(userId));

    res.send(response[0]);
  });

  router.patch('/:userId', async (req, res) => {
    const { orgId, userId } = req.params;
    const { annotation, isAdmin } = req.body;

    let users = await orgs.updateOne({ _id: orgId, 'users._id': userId }, { $set: { 'users.$.annotation': annotation, 'users.$.isAdmin': isAdmin } });

    res.send(users);
  });

  router.post('/', async (req, res) => {
    const { email, annotation, isAdmin, locale } = req.body;

    let organisation = req.org;
    let user = await users.findOne({ email: email });

    if (!user) {
      user = new users({ email: email });
      user.save();

      const from = process.env.MAGIC_FROM;
      const prefix = process.env.MAGIC_URL_PREFIX;

      if (locale == 'pl') {
        mailer.sendTemplate(
          'templates/invite_pl.html',
          { from: from, to: req.body.email, subject: 'Zostałeś zaproszony do organizacji ' + organisation.name + ' (' + organisation.address + ').' },
          { organisationName: organisation.name, organisationAddress: organisation.address, magicUrlPrefix: prefix }
        );
      } else {
        mailer.sendTemplate(
          'templates/invite_en.html',
          { from: from, to: req.body.email, subject: 'You have just been invited to ' + organisation.name + ' (' + organisation.address + ').' },
          { organisationName: organisation.name, organisationAddress: organisation.address, magicUrlPrefix: prefix }
        );
      }
    }

    organisation.users.push({ _userId: user._id, isAdmin: isAdmin, annotation: annotation });

    await organisation.validate().catch((err) => {
      return res.code(400).send({ msg: err });
    });

    organisation.save();

    res.send(organisation.users[organisation.users.length - 1]);
  });

  router.delete('/:userId', async (req, res) => {
    const { userId } = req.params;

    let organisation = req.org;

    organisation.users = organisation.users.filter((x) => String(x._id) !== String(userId));

    let roles = [];

    // Remove deleted user from all roles.
    for (let role of organisation.roles) {
      role.users = role.users.filter((x) => String(x._id) !== String(userId));
      roles.push(role);
    }

    organisation.roles = roles;

    organisation.save();

    res.send(organisation);
  });
}

module.exports = routes;
