const nock = require('nock');
const { handler } = require('../leaderboards');

describe('leaderboards function', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('returns status 200 with response body', async () => {
    const mockResponse = 'ok';
    nock('https://partner.steam-api.com')
      .get(/.*/)
      .reply(200, mockResponse);

    const result = await handler({}, {});
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(mockResponse);
  });
});
