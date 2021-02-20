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

    let organisation = await orgs.findOne({ _id: orgId });

    res.json(organisation.roles);
  })
);

router.post(
  '/',
  authUser,
  isOrgAdmin,
  asyncHandler(async (req, res) => {
    const { name, permissions } = req.body;
    const { orgId } = req.params;

    let organisation = await orgs.findOne({ _id: orgId });

    organisation.roles.push({ name: name, permissions: permissions });

    await organisation.validate().catch((err) => {
      return res.status(400).json({ msg: err });
    });

    organisation.save();

    res.json(organisation.roles);
  })
);

// TODO: PATCH: /roles

// TODO: DELETE: /roles

module.exports = router;
