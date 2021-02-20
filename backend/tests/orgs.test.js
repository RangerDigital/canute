const db = require('./db');
const app = require('../server');

const { getAuthToken } = require('./helpers');

const supertest = require('supertest');
const request = supertest(app);

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clear());
afterAll(async () => await db.close());

describe('Orgs Resources', function () {
  it('Positive: Check GET: /orgs without belonging to any', async () => {
    {
      const authToken = getAuthToken();

      const res = await request.get('/orgs').set('Authorization', 'Bearer ' + authToken);

      expect(res.status).toBe(200);
      expect(res.body).toStrictEqual([]);
    }
  });

  it('Positive: Check POST: /orgs. Create a new organisation, then edit It', async () => {
    const authToken = getAuthToken();
    let orgId;

    {
      const name = 'Vanguard';

      const res = await request
        .post('/orgs')
        .set('Authorization', 'Bearer ' + authToken)
        .send({ name: name });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe(name);
      expect(res.body.users[0].isAdmin).toBe(true);

      orgId = res.body._id;
    }

    {
      const name = 'Black Mesa';

      const res = await request
        .patch('/orgs/' + orgId)
        .set('Authorization', 'Bearer ' + authToken)
        .send({ name: name });

      expect(res.status).toBe(200);
      expect(res.body.name).toBe(name);
    }
  });
});
