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
}

module.exports = new OrgService();
