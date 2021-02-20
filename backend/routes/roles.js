const express = require('express');
const router = express.Router({ mergeParams: true });
const asyncHandler = require('express-async-handler');

const authUser = require('../middleware/authUser');

const isOrgAdmin = require('../middleware/isOrgAdmin');
const orgs = require('../models/orgs');

router.get(
  '/',
  authUser,
  isOrgAdmin,
  asyncHandler(async (req, res) => {
    const { orgId } = req.params;

    let organisation = await orgs.find({ _orgId: orgId });

    res.json(organisation);
  })
);

module.exports = router;
