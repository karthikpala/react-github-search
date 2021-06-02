import React from 'react';
import repoResult from '../../__mocks__/repoResult.json';
import RepoList from '../../src/components/RepoList/RepoList';
import fetch from 'jest-fetch-mock';
import { create } from 'react-test-renderer';
import { observeMock } from '../main/App.test';

describe('RepoList', () => {
  beforeEach(() => {
    fetch.resetMocks();
    window.IntersectionObserver = () => observeMock;
  });

  it('should render RepoList component correctly', () => {
    fetch.mockResponseOnce(JSON.stringify(repoResult));
    const component = create(<RepoList />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
