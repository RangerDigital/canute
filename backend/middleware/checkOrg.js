const orgs = require('../models/orgs');

function checkOrg(onlyAdmin) {
  return async function (req, res, next) {
    const { orgId } = req.params;

    if (onlyAdmin) {
      let organisation = await orgs.findOne({ _id: orgId, users: { $elemMatch: { _userId: req.userId, isAdmin: true } } });

      if (!organisation) {
        return res.status(403).json({ msg: 'Permissions not sufficient for this operation!' });
      } else {
        req.org = organisation;
        next();
      }
    } else {
      let organisation = await orgs.findOne({ _id: orgId });

      req.org = organisation;
      next();
    }
  };
}

module.exports = checkOrg;
