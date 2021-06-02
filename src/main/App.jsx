import React, { Component } from 'react';
import RepoList from '../components/RepoList/RepoList';
import './app.scss';
import { CONFIG } from '../utils/constants';

/**
 * Component to render react app
 * @author [Karthik Pala]
 * @extends Component
 */
class App extends Component {
  /**
   * Create an App component
   */
  constructor(props) {
    super(props);
  }

  /**
   * React render Method
   */
  render() {
    return (
      <>
        <header className="flex flex--center app-header">
          <h2 className="app-header__title">
            <i className="fa fa-user-circle-o"></i> {CONFIG.title}
          </h2>
        </header>
        <main className="app-main">
          <div className="app-main__content">
            <RepoList />
          </div>
        </main>
      </>
    );
  }
}

export default App;
