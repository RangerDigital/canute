const orgs = require('../models/orgs');

function checkOrg(onlyAdmin = false) {
  return async function (req, res, next) {
    const { orgId } = req.params;

    if (onlyAdmin) {
      let organisation = await orgs.findOne({ _id: orgId, users: { $elemMatch: { _userId: req.userId, isAdmin: true } } });

      if (!organisation) {
        return res.status(403).json({ msg: 'Permissions not sufficient for this operation!' });
      } else {
        req.org = organisation;
        req.user = organisation.users.filter((x) => String(x._userId) === String(req.userId))[0];

        next();
      }
    } else {
      let organisation = await orgs.findOne({ _id: orgId, users: { $elemMatch: { _userId: req.userId } } });

      req.org = organisation;
      req.user = organisation.users.filter((x) => String(x._userId) === String(req.userId))[0];

      next();
    }
  };
}

module.exports = checkOrg;
