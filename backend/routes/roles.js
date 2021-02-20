const express = require('express');
const router = express.Router({ mergeParams: true });
const asyncHandler = require('express-async-handler');

const checkAuth = require('../middleware/checkAuth');

const checkOrg = require('../middleware/checkOrg');
const orgs = require('../models/orgs');

router.get(
  '/',
  checkAuth,
  checkOrg(true),
  asyncHandler(async (req, res) => {
    res.json(req.org.roles);
  })
);

router.post(
  '/',
  checkAuth,
  checkOrg(true),
  asyncHandler(async (req, res) => {
    const { name, permissions, users } = req.body;
    let organisation = req.org;

    organisation.roles.push({ name: name, permissions: permissions, users: users });

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
