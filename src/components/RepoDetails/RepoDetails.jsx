import React, { PureComponent } from 'react';
import { object } from 'prop-types';

/**
 * Component to render and display RepoDetails details like full name, avatar, description, license etc - styled as a card
 * @author [Karthik Pala]
 * @extends PureComponent
 */
class RepoDetails extends PureComponent {
  /**
   * Create a RepoDetails component
   */
  constructor() {
    super();
  }

  /**
   * React render Method
   */
  render() {
    return (
      <>
        <div className="card__avatar">
          <img
            className="card__avatar__img"
            src={this.props.item && this.props.item.owner.avatar_url}
            draggable="false"
          ></img>
        </div>
        <div className="card__name">
          <h2>{this.props.item.full_name}</h2>
        </div>

        {this.props.item.description && (
          <div className="flex">
            <span className="card__text">
              <span className="card__label">Description</span>
              {this.props.item.description}
            </span>
          </div>
        )}
        
        {this.props.item.forks !==undefined && (
          <div className="flex">
            <span className="card__text">
              <span className="card__label">Forks</span>
              {this.props.item.forks}
            </span>
          </div>
        )}

        {this.props.item.watchers !== undefined && (
          <div className="flex">
            <span className="card__text">
              <span className="card__label">Watchers</span>
              {this.props.item.watchers}
            </span>
          </div>
        )}
        
        {this.props.item.open_issues !== undefined && (
          <div className="flex">
            <span className="card__text">
              <span className="card__label">Open Issues</span>
              {this.props.item.open_issues}
            </span>
          </div>
        )}

        {this.props.item.license?.name && (
          <div className="flex">
            <span className="card__text">
              <span className="card__label">License</span>
              {this.props.item.license.name}
            </span>
          </div>
        )}

        {this.props.item.html_url && (
          <div className="flex" onClick={() => {window.open(this.props.item.html_url, "_blank")}}>
            <span className="card__text">
              <i className="fa fa-arrow-circle-right card__icon"></i>
            </span>
          </div>
        )}
      </>
    );
  }
}

RepoDetails.propTypes = {
  item: object.isRequired,
};

export default RepoDetails;
