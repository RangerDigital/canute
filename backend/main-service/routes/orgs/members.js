const MemberService = require('../../services/orgs/MemberService');

async function routes(router) {
  router.register(require('../../hooks/adminHook'));

  router.get('/', async (req, res) => {
    const { orgId } = req.params;

    const members = await MemberService.get(orgId);

    res.send(members);
  });

  router.get('/:userId', async (req, res) => {
    const { orgId, userId } = req.params;

    const member = await MemberService.getOne(orgId, userId);

    res.send(member);
  });

  router.patch('/:userId', async (req, res) => {
    const { orgId, userId } = req.params;
    const { annotation, isAdmin } = req.body;

    const member = await MemberService.update(orgId, userId, annotation, isAdmin);

    res.send(member);
  });

  router.post('/', async (req, res) => {
    const { orgId } = req.params;
    const { email, annotation, isAdmin, locale } = req.body;

    const member = await MemberService.create(orgId, email, annotation, isAdmin, locale);

    res.send(member);
  });

  router.delete('/:userId', async (req, res) => {
    const { orgId, userId } = req.params;

    const members = await MemberService.delete(orgId, userId);

    res.send(members);
  });
}

module.exports = routes;
