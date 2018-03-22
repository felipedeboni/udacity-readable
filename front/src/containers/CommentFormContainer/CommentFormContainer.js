import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  addComment,
  editComment,
  fetchComment,
  FETCH_COMMENT_FAIL
} from 'actions/comment';
import { fetchPost } from 'actions/post';
import { CommentForm } from 'components';

export class CommentFormContainer extends Component {
  componentDidMount() {
    const { id, post, comment, fetch, fetchPost } = this.props;

    if (id && !comment) {
      fetch(id)
        .then(this.afterFetch)
        .catch(this.afterFetch);
    }

    if (comment && !post) {
      fetchPost(comment.parentId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { post, comment = {}, fetchPost } = this.props;
    if (!post && comment.id !== nextProps.comment.id) {
      fetchPost(nextProps.comment.parentId);
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

  onSubmit = data => {
    const { postId, id, add, edit } = this.props;

    const savePromise = id ? edit(id, data) : add(postId, data);
    return savePromise.then(this.afterSave);
  };

  afterSave = ({ payload: { data } }) => {
    const { id, history } = this.props;

    if (id) {
      const { post: { category } } = this.props;
      history.push(`/${category}/${data.parentId}`);
    }
  };

  render = () => {
    const { id, comment, post } = this.props;
    const shouldRender = (post && comment) || !id;

    return (
      <div>
        {shouldRender && (
          <CommentForm comment={comment} onSubmitHandler={this.onSubmit} />
        )}
        {!shouldRender && <div>Loading</div>}
      </div>
    );
  };
}

const mapProps = (state, { id }) => {
  const comment = state.comments[id];
  return {
    comment: comment,
    post: comment ? state.posts[comment.parentId] : undefined
  };
};

const mapDispatch = dispatch => {
  return {
    add: (postId, data) => dispatch(addComment(postId, data)),
    edit: (id, data) => dispatch(editComment(id, data)),
    fetch: commentId => dispatch(fetchComment(commentId)),
    fetchPost: postId => dispatch(fetchPost(postId))
  };
};

export default connect(mapProps, mapDispatch)(CommentFormContainer);
