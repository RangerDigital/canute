const orgs = require('../../models/orgs');

class RoleService {
  async get(orgId) {
    const organisation = await orgs.findOne({ _id: orgId });

    return organisation.roles;
  }
  async getOne(orgId, roleId) {
    const organisation = await orgs.findOne({ _id: orgId });

    const role = organisation.roles.filter((x) => String(x._id) == String(roleId));

    return role[0];
  }

  async create(orgId, name, permissions, users) {
    let organisation = await orgs.findOne({ _id: orgId });

    organisation.roles.push({ name: name, permissions: permissions, users: users });

    organisation.save();

    return organisation.roles;
  }

  async update(orgId, roleId, name, permissions) {
    return await orgs.updateOne({ _id: orgId, 'roles._id': roleId }, { $set: { 'roles.$.name': name, 'roles.$.permissions': permissions } });
  }

  async delete(orgId, roleId) {
    let organisation = await orgs.findOne({ _id: orgId, 'roles._id': roleId });

    organisation.roles = organisation.roles.filter((x) => String(x._id) !== String(roleId));
    organisation.save();

    return organisation.roles;
  }

  async addMember(orgId, roleId, userId) {
    let organisation = await orgs.findOne({ _id: orgId });

    if (organisation.roles.find((x) => x._id == roleId).users.includes(userId)) {
      return organisation.roles;
    }

    organisation.roles.find((x) => x._id == roleId).users.push(userId);
    organisation.save();

    return organisation.roles;
  }

  async deleteMember(orgId, roleId, userId) {
    let organisation = await orgs.findOne({ _id: orgId });

    organisation.roles.find((x) => x._id == roleId).users.pull(userId);
    organisation.save();

    return organisation.roles;
  }
}

module.exports = new RoleService();
