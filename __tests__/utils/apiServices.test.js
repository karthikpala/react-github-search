import APIServices from '../../src/utils/apiServices';
import repoResult from '../../__mocks__/repoResult.json';
import fetch from 'jest-fetch-mock';

describe('Fetching repo data from server', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should get atleast one repo in list', async () => {
    fetch.mockResponseOnce(JSON.stringify(repoResult));
    const data = await APIServices.getRepoList();
    expect(data.items).toBeDefined();
    expect(data.items.length).toBeGreaterThan(1);
    expect(fetch.mock.calls.length).toEqual(1);
  });
});
