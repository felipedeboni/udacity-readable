import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchComment,
  removeComment,
  FETCH_COMMENT_FAIL
} from 'actions/comment';

class CommentContainer extends Component {
  componentDidMount() {
    const { commentId, comment, fetch } = this.props;
    if (!comment) {
      fetch(commentId)
        .then(this.afterFetch)
        .catch(this.afterFetch);
    }
  }

  afterFetch = response => {
    const { history } = this.props;
    if (
      response.type === FETCH_COMMENT_FAIL ||
      !response.payload ||
      !response.payload.data.id
    ) {
      history.replace('/404');
    }
  };

  render() {
    const { component, comment, remove } = this.props;

    if (comment) {
      return React.createElement(component, {
        comment: comment,
        removeHandler: remove,
        ...this.props
      });
    }

    return null;
  }
}

const mapProps = (state, ownProps) => {
  return {
    comment: ownProps.comment || state.comments[ownProps.commentId]
  };
};

const mapDispatch = dispatch => {
  return {
    fetch: commentId => dispatch(fetchComment(commentId)),
    remove: commentId => dispatch(removeComment(commentId))
  };
};

export default connect(mapProps, mapDispatch)(CommentContainer);
