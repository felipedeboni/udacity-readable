import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCommentsByPost } from 'actions/comment';
import { CommentsList } from 'components';

class CommentsListContainer extends Component {
  componentDidMount() {
    const { postId, fetch } = this.props;
    fetch(postId);
  }

  render() {
    const { postId, comments, category } = this.props;
    return (
      <div>
        <CommentsList postId={postId} comments={comments} category={category} />
      </div>
    );
  }
}

const mapProps = (state, ownProps) => {
  return {
    comments: Object.keys(state.comments).map(
      commentId => state.comments[commentId]
    )
  };
};

const mapDispatch = dispatch => {
  return {
    fetch: postId => dispatch(fetchCommentsByPost(postId))
  };
};

export default connect(mapProps, mapDispatch)(CommentsListContainer);
