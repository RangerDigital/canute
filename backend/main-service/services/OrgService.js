const orgs = require('../models/orgs');

class OrgService {
  async getUserOrgs(userId) {
    let organisations = [];

    // Check if a logged user is an admin in this organisation.
    for (let organisation of await orgs.find({ 'members._userId': userId })) {
      organisation = organisation.toObject();
      organisation.isAdmin = false;

      for (let user of organisation.members) {
        if (user._userId == userId && user.isAdmin == true) {
          organisation.isAdmin = true;
        }
      }

      organisations.push(organisation);
    }

    return organisations;
  }

  async addOrg(userId, name, address) {
    let organisation = new orgs({ name: name, address: address, members: [{ _userId: userId, isAdmin: true }] });
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
}

module.exports = new OrgService();
