import React, { Component } from 'react';
import classNames from 'classnames';
import RepoDetails from '../RepoDetails/RepoDetails';
import APIServices from '../../utils/apiServices';
import SearchBox from '../Common/SearchBox/SearchBox';
import { CONFIG } from '../../utils/constants';

const INITIAL_PAGE = 1;

/**
 * Component for showing a list of github repositories.
 * Has ability to make an API call to fetch the list of repos from server based on search string entered by user
 * @author [Karthik Pala]
 * @extends Component
 */
class RepoList extends Component {
  /**
   * @name state
   * @memberOf RepoList
   * @instance
   * @property state {Object} - Indicates the actual state of the component
   * @property state.selectedRepo {Object} - Used to store the repo object to be displayed to user when selected
   * @property state.loading {Object} - Used to show loading symbol to user
   * @property state.page {Object} - Used to identify the page used in infinite scroll
   * @property state.data {Object} - Used to store the data retrieved from API
   */

  /**
   * Create a RepoList component
   * and intitialize default state
   */
  constructor() {
    super();
    /**
     * @name pageLimit
     * @memberOf RepoList
     * @instance
     * @property this {Number} - contains the pagelimit decided as per github docs
     */
    this.pageLimit = Math.ceil(CONFIG.searchLimit / CONFIG.numberPerPage);
    /**
     * @name observer
     * @memberOf RepoList
     * @instance
     * @property this {Object} - holds the IntersectionObserver object to handle infinite scroll pagination
     */
    this.observer;
    this.state = {
      loading: false,
      searchValue: '',
      page: INITIAL_PAGE,
      offsetY: 0,
    };
  }

  componentDidMount() {
    /**
     * The below code sets up an IntersectionObserver to handle infinite scroll
     */
    var options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };
    this.observer = new IntersectionObserver(this.handleObserver, options);
    this.observer.observe(this.loadingRef);
  }

  /**
   * Function to handle observer when the target element reaches the root provided offset
   */
  handleObserver = (entities) => {
    let { page, offsetY, data } = this.state;
    const y = entities[0].boundingClientRect.y;
    if (offsetY > y && data?.items?.length > 0) {
      const maxPossiblePages = Math.ceil(
        data.total_count / CONFIG.numberPerPage
      );
      if (page >= this.pageLimit || page >= maxPossiblePages) {
        return;
      }
      page++;
      this.getAndSetRepoData(this.state.searchValue, page);
    }
    this.setState({ offsetY: y, page: page });
  };

  /**
   * Function to make API call and fetch repo data objects from server
   * And sets the value to {@link RepoList#state#data}
   */
  getAndSetRepoData(...args) {
    this.setState({ loading: true }, () => {
      APIServices.getRepoList(...args)
        .then((res) => {
          let { data } = this.state;
          if (data?.items?.length > 0) {
            data.items = data.items.concat(res.items);
            this.setState({ data: data, loading: false });
          } else {
            this.setState({ data: res, loading: false });
          }
        })
        .catch((err) => {
          console.error('Error during API call: ', err);
        });
    });
  }

  clearData() {
    this.setState({ data: null });
  }

  /**
   * Method called on click of any repo in the grid.
   * Used to update state @property{selectedRepo}
   */
  selectItemAndDisplay(item) {
    this.setState({
      selectedRepo: item,
    });
  }

  /**
   * Callback Method called with debounce when user enters any data in search field.
   * Used to update state @property{searchValue}
   */
  onSearch = (value) => {
    if (value?.trim().length === 0) {
      this.clearData();
    } else {
      this.setState({ searchValue: value, page: INITIAL_PAGE,data: undefined});
      this.getAndSetRepoData(value, INITIAL_PAGE);
    }
  };

  /**
   * Render Method for Grid view
   */
  renderRepoGridView() {
    return (
      <div className="grid">
        {this.state.data.items.map((item) => {
          const repoSelected =
            this.state.selectedRepo && this.state.selectedRepo.id === item.id;
          return (
            <div
              className={classNames('grid__item', {
                'grid__item--active': repoSelected,
              })}
              key={item.id}
              onClick={() => this.selectItemAndDisplay(item)}
            >
              <div className="flex flex--center item-avatar-thumbnail">
                <img
                  className="grid__item__thumbnail"
                  src={item.owner.avatar_url}
                  draggable="false"
                ></img>
              </div>
              <div className="flex flex--center">
                <p className="grid__item__text">{item.full_name}</p>
              </div>

              <div className="grid__item__enlarged">
                {repoSelected && (
                  <div
                    className="grid__item__enlarged__close"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.setState({selectedRepo: null});
                    }}
                  >
                    <i className="fa fa-close" />
                  </div>
                )}
                <div
                  className={classNames('grid__item__enlarged__card', {
                    'grid__item__enlarged__card--active': repoSelected,
                  })}
                >
                  <div className="card card--theme-primary">
                    <RepoDetails item={item} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  /**
   * Render Method for Empty view when no repo data is empty
   */
  renderEmptyView() {
    return (
      <div className="flex flex--center empty">
        {!this.state.loading ? (
          this.state.data ? (
            <>
              <i className="empty__icon fa fa-exclamation-triangle"></i>
              <p>No repo's found</p>
            </>
          ) : (
            <>
              <i className="empty__icon fa fa-search"></i>
              <p>Start searching by entering repo name </p>
            </>
          )
        ) : (
          <p> Loading data... </p>
        )}
      </div>
    );
  }

  /**
   * React render Method
   */
  render() {
    return (
      <>
        <div className="options">
          <div className="options__left flex flex--left">
            {this.state.data?.total_count && (
              <span className="options__count">
                {this.state.data?.total_count} Repo's found
              </span>
            )}
          </div>
          <div className="flex flex--center">
            <SearchBox
              items={this.state.data?.items}
              onSearch={this.onSearch}
            />
          </div>
          <div className="options__right flex"></div>
        </div>
        {this.state.data &&
        this.state.data.items &&
        this.state.data.items.length
          ? this.renderRepoGridView()
          : this.renderEmptyView()}
        <div
          className="flex flex--center page-loading"
          ref={(loadingRef) => (this.loadingRef = loadingRef)}
        >
          <span>
            {this.state.loading && this.state.page > 1 && 'Loading...'}
          </span>
        </div>
      </>
    );
  }
}

export default RepoList;
