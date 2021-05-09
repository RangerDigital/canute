const mailer = require('../../mailer');

const orgs = require('../../models/orgs');
const users = require('../../models/users');

class MemberService {
  async get(orgId) {
    const organisation = await orgs.findOne({ _id: orgId }).populate('members.user', '-_id -__v -auth');

    let response = [];

    for (let member of organisation.members.toObject()) {
      let roles = [];

      for (let role of organisation.roles) {
        if (role.members.includes(member._id)) {
          roles.push({ _id: role._id, name: role.name, permissions: role.permissions });
        }
      }

      member = member;
      member.roles = roles;
      member.email = member.user.email;

      delete member.user;
      response.push(member);
    }

    return response;
  }

  async getOne(orgId, memberId) {
    const members = await this.get(orgId);

    return members.filter((x) => String(x._id) == String(memberId))[0];
  }

  async create(orgId, email, annotation, isAdmin, locale) {
    let organisation = await orgs.findOne({ _id: orgId });
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

    organisation.members.push({ _userId: user._id, isAdmin: isAdmin, annotation: annotation });
    organisation.save();

    return organisation.members[organisation.members.length - 1];
  }

  async update(orgId, memberId, annotation, isAdmin) {
    return await orgs.updateOne({ _id: orgId, 'members._id': memberId }, { $set: { 'members.$.annotation': annotation, 'members.$.isAdmin': isAdmin } });
  }

  async delete(orgId, memberId) {
    const organisation = await orgs.findOne({ _id: orgId });

    organisation.members = organisation.members.filter((x) => String(x._id) !== String(memberId));

    let roles = [];

    // Remove deleted member from all roles.
    for (let role of organisation.roles) {
      role.members = role.members.filter((x) => String(x._id) !== String(memberId));
      roles.push(role);
    }

    organisation.roles = roles;

    organisation.save();

    return organisation.members;
  }
}

module.exports = new MemberService();
