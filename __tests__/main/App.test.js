import React from 'react';
import App from '../../src/main/App';
import repoResult from '../../__mocks__/repoResult.json';
import { create } from 'react-test-renderer';
import fetch from 'jest-fetch-mock';

/*
 * If nodes are rmeoved (or) some changes are made in the existing component, This test case will fail
 * We either have to update the snapshot by running node run undate-snapshots (or) fix the issue in component
 * Childer component can be either mocked (or) added with valid API calls mocked
 * I choose the latter one
 */
describe('App', () => {
  beforeEach(() => {
    fetch.resetMocks();
    window.IntersectionObserver = () => observeMock;
  });

  it('should render App component correctly', () => {
    fetch.mockResponseOnce(JSON.stringify(repoResult));
    const component = create(<App />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});

export const observeMock = {
  observe: () => null
};
