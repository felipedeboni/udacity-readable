import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { fetchCategories } from 'actions/category';
import { App } from 'components';

class AppContainer extends Component {
  componentDidMount() {
    const { categories, fetch } = this.props;
    if (!categories) {
      fetch();
    }
  }

  render() {
    const { categories } = this.props;
    return <App categories={categories} />;
  }
}

const mapProps = (state, ownProps) => {
  return {
    categories: state.categories.length > 0 ? state.categories : undefined
  };
};

const mapDispatch = dispatch => {
  return {
    fetch: () => dispatch(fetchCategories())
  };
};

export default withRouter(connect(mapProps, mapDispatch)(AppContainer));
