const MemberService = require('../../services/orgs/MemberService');

async function routes(router) {
  router.register(require('../../hooks/adminHook'));

  router.get('/', async (req, res) => {
    const { orgId } = req.params;

    const members = await MemberService.get(orgId);

    res.send(members);
  });

  router.get('/:memberId', async (req, res) => {
    const { orgId, memberId } = req.params;

    const member = await MemberService.getOne(orgId, memberId);

    res.send(member);
  });

  router.patch('/:memberId', async (req, res) => {
    const { orgId, memberId } = req.params;
    const { annotation, isAdmin } = req.body;

    const member = await MemberService.update(orgId, memberId, annotation, isAdmin);

    res.send(member);
  });

  router.post('/', async (req, res) => {
    const { orgId } = req.params;
    const { email, annotation, isAdmin, locale } = req.body;

    const member = await MemberService.create(orgId, email, annotation, isAdmin, locale);

    res.send(member);
  });

  router.delete('/:memberId', async (req, res) => {
    const { orgId, memberId } = req.params;

    const members = await MemberService.delete(orgId, memberId);

    res.send(members);
  });
}

module.exports = routes;
