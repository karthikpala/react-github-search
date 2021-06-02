import React, { Component } from 'react';
import CommonUtil from '../../../utils/CommonUtil';

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  update = CommonUtil.debounce((value) => {
    this.props.onSearch(value);
  }, 1000);

  render() {
    const { searchText } = this.state;
    return (
      <div className="wrapper">
        <input
          onChange={(e) => {
            let value = e.target.value;
            this.update(value);
          }}
          placeholder="Search repositories"
          value={searchText}
          type="search"
        />
      </div>
    );
  }
}
