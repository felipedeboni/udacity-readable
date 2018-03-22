import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPost, editPost, fetchPost, FETCH_POST_FAIL } from 'actions/post';
import { PostForm } from 'components';

export class PostFormContainer extends Component {
  componentDidMount() {
    const { id, post, fetch } = this.props;

    if (id && !post) {
      fetch(id)
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

  onSubmit = data => {
    const { id, add, edit } = this.props;

    const savePromise = id ? edit(id, data) : add(data);
    savePromise.then(this.afterSave);
  };

  afterSave = ({ payload: { data } }) => {
    const { history } = this.props;
    history.push(`/${data.category}/${data.id}`);
  };

  render = () => {
    const { id, post, categories } = this.props;
    const shouldRender = post || !id;

    return (
      <div>
        {shouldRender && (
          <PostForm
            id={id}
            post={post}
            onSubmitHandler={this.onSubmit}
            categories={categories}
          />
        )}
        {!shouldRender && <div>Loading</div>}
      </div>
    );
  };
}

const mapProps = (state, { id }) => {
  return {
    post: state.posts[id]
  };
};

const mapDispatch = dispatch => {
  return {
    add: data => dispatch(addPost(data)),
    edit: (id, data) => dispatch(editPost(id, data)),
    fetch: postId => dispatch(fetchPost(postId))
  };
};

export default connect(mapProps, mapDispatch)(PostFormContainer);
