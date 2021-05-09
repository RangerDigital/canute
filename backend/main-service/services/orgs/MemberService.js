const mailer = require('../../mailer');

const orgs = require('../../models/orgs');
const users = require('../../models/users');

class MemberService {
  async get(orgId) {
    const organisation = await orgs.findOne({ _id: orgId }).populate('users.user', '-_id -__v -auth');

    let response = [];

    for (let user of organisation.users.toObject()) {
      let roles = [];

      for (let role of organisation.roles) {
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

    return response;
  }

  async getOne(orgId, memberId) {
    const members = await this.get(orgId);

    return members.filter((x) => String(x._id) == String(memberId))[0];
  }

  async create(orgId, email, annotation, isAdmin, locale) {
    const organisation = await orgs.findOne({ _id: orgId });
    const user = await users.findOne({ email: email });

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
    organisation.save();

    return organisation.users[organisation.users.length - 1];
  }

  async update(orgId, memberId, annotation, isAdmin) {
    return await orgs.updateOne({ _id: orgId, 'users._id': memberId }, { $set: { 'users.$.annotation': annotation, 'users.$.isAdmin': isAdmin } });
  }

  async delete(orgId, memberId) {
    const organisation = await orgs.findOne({ _id: orgId });

    organisation.users = organisation.users.filter((x) => String(x._id) !== String(memberId));

    let roles = [];

    // Remove deleted user from all roles.
    for (let role of organisation.roles) {
      role.users = role.users.filter((x) => String(x._id) !== String(memberId));
      roles.push(role);
    }

    organisation.roles = roles;

    organisation.save();

    return organisation.users;
  }
}

module.exports = new MemberService();
