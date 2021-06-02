import React from 'react';
import RepoDetails from '../../src/components/RepoDetails/RepoDetails';
import repoResult from '../../__mocks__/repoResult.json';
import { create } from 'react-test-renderer';

describe('RepoDetails', () => {
  it('should render RepoDetails component correctly', () => {
    const item = repoResult.items[0];
    const component = create(<RepoDetails item={item} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
