import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllPosts, fetchPostsByCategory } from 'actions/post';
import { PostsList } from 'components';

export class PostsListContainer extends Component {
  componentDidMount() {
    this.fetchCategory(this.props.category);
  }

  componentWillReceiveProps(nextProps) {
    const category =
      typeof nextProps.category !== 'undefined'
        ? nextProps.category
        : this.props.category;
    if (this.props.category !== category) {
      this.fetchCategory(nextProps.category);
    }
  }

  fetchCategory(category) {
    const { fetchAllPosts, fetchPostsByCategory } = this.props;

    category ? fetchPostsByCategory(category) : fetchAllPosts();
  }

  render() {
    const { posts } = this.props;
    return (
      <div>
        {posts && <PostsList posts={posts} />}
        {!posts && <div className="loading">loading</div>}
      </div>
    );
  }
}

const mapProps = (state, ownProps) => {
  return {
    posts: Object.keys(state.posts).map(postId => state.posts[postId])
  };
};

const mapDispatch = dispatch => {
  return {
    fetchAllPosts: () => dispatch(fetchAllPosts()),
    fetchPostsByCategory: categoryId =>
      dispatch(fetchPostsByCategory(categoryId))
  };
};

export default connect(mapProps, mapDispatch)(PostsListContainer);
