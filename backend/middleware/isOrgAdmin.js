const orgs = require('../models/orgs');

async function isOrgAdmin(req, res, next) {
  const { orgId } = req.params;

  let organisation = await orgs.findOne({ _id: orgId, users: { $elemMatch: { _userId: req.userId, isAdmin: true } } });
  console.log(organisation);

  if (!organisation) {
    return res.status(403).json({ msg: 'Permissions not sufficient to edit this organisation!' });
  } else {
    next();
  }
}

module.exports = isOrgAdmin;
