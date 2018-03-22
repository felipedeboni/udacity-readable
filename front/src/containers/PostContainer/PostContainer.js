import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, removePost, FETCH_POST_FAIL } from 'actions/post';

class PostContainer extends Component {
  componentDidMount() {
    const { postId, post, fetch } = this.props;

    if (!post) {
      fetch(postId)
        .then(this.afterFetch)
        .catch(this.afterFetch);
    }
  }

  afterFetch = response => {
    const { history, match: { params: { category } } } = this.props;
    const is404 =
      response.type === FETCH_POST_FAIL ||
      !response.payload ||
      !response.payload.data.id ||
      response.payload.data.category !== category;
    if (is404) {
      history.replace('/404');
    }
  };

  render() {
    const { component, post, remove, history } = this.props;

    if (post) {
      return React.createElement(
        component,
        {
          post,
          history,
          removeHandler: remove
        },
        null
      );
    }

    return null;
  }
}

const mapProps = (state, ownProps) => {
  return {
    post: ownProps.post || state.posts[ownProps.postId]
  };
};

const mapDispatch = dispatch => {
  return {
    fetch: postId => dispatch(fetchPost(postId)),
    remove: postId => dispatch(removePost(postId))
  };
};

export default connect(mapProps, mapDispatch)(PostContainer);
