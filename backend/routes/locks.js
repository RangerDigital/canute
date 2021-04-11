const express = require('express');
const router = express.Router({ mergeParams: true });

const checkAuth = require('../middleware/checkAuth');
const checkOrg = require('../middleware/checkOrg');
const devices = require('../models/devices');

router.get('/', checkAuth, checkOrg(), async (req, res) => {
  const { orgId } = req.params;

  console.log('WTF');

  let deviceArray = await devices.find({ _orgId: orgId });

  let locks = [];

  console.log(req.org.roles);

  for (let device of deviceArray) {
    for (let shadow of device.shadows) {
      // Check if users have a role with permission to this shadow.

      console.log(req.org.roles.filter((x) => x.permissions.includes(shadow._id) && x.users.includes(req.user._id)).length);
      if (req.org.roles.filter((x) => x.permissions.includes(shadow._id) && x.users.includes(req.user._id)).length) {
        console.log(shadow);
        // Check if shadow class == lock.
        if (shadow.class === 'lock') {
          locks.push(shadow);
        }
      }
    }
  }

  res.json(locks);
});

module.exports = router;
