const orgs = require('../models/orgs');

class OrgService {
  async getUserOrgs(userId) {
    let organisations = [];

    // Check if a logged user is an admin in this organisation.
    for (let organisation of await orgs.find({ 'users._userId': userId })) {
      organisation = organisation.toObject();
      organisation.isAdmin = false;

      for (let user of organisation.users) {
        if (user._userId == userId && user.isAdmin == true) {
          organisation.isAdmin = true;
        }
      }

      organisations.push(organisation);
    }

    return organisations;
  }

  async addOrg(userId, name, address) {
    let organisation = new orgs({ name: name, address: address, users: [{ _userId: userId, isAdmin: true }] });
    organisation.save();

    return organisation;
  }

  async getOne(orgId) {
    return await orgs.findOne({ _id: orgId });
  }

  async updateOne(orgId, name, address) {
    let organisation = await orgs.findOne({ _id: orgId });

    organisation.name = name;
    organisation.address = address;

    organisation.save();

    return organisation;
  }

  async getRoles(orgId) {
    const organisation = await orgs.findOne({ _id: orgId });

    return organisation.roles;
  }
  async getOneRole(orgId, roleId) {
    const organisation = await orgs.findOne({ _id: orgId });

    const role = organisation.roles.filter((x) => String(x._id) == String(roleId));

    return role[0];
  }

  async addRole(orgId, name, permissions, users) {
    let organisation = await orgs.findOne({ _id: orgId });

    organisation.roles.push({ name: name, permissions: permissions, users: users });

    organisation.save();

    return organisation.roles;
  }

  async updateRole(orgId, roleId, name, permissions) {
    return await orgs.updateOne({ _id: orgId, 'roles._id': roleId }, { $set: { 'roles.$.name': name, 'roles.$.permissions': permissions } });
  }

  async deleteRole(orgId, roleId) {
    let organisation = await orgs.findOne({ _id: orgId, 'roles._id': roleId });

    organisation.roles = organisation.roles.filter((x) => String(x._id) !== String(roleId));
    organisation.save();

    return organisation.roles;
  }

  async addUserToRole(orgId, roleId, userId) {
    let organisation = await orgs.findOne({ _id: orgId });

    if (organisation.roles.find((x) => x._id == roleId).users.includes(userId)) {
      return organisation.roles;
    }

    organisation.roles.find((x) => x._id == roleId).users.push(userId);
    organisation.save();

    return organisation.roles;
  }

  async deleteUserFromRole(orgId, roleId, userId) {
    let organisation = await orgs.findOne({ _id: orgId });

    organisation.roles.find((x) => x._id == roleId).users.pull(userId);
    organisation.save();

    return organisation.roles;
  }
}

module.exports = new OrgService();
