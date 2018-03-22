import React, { Component } from 'react';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import { PostContainer } from 'containers';
import { PostListItem } from 'components';
import './PostsList.css';

class PostsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sort: props.sort || '-timestamp'
    };
  }

  handleChange = value => {
    this.setState({
      sort: value
    });
  };

  render() {
    const { posts } = this.props;
    const { sort } = this.state;
    const sortedPosts = posts.sort(sortBy(sort));

    return (
      <section className="post__list__container">
        {sortedPosts.length > 0 && (
          <div className="form-inline">
            <label htmlFor="sortby" className="control-label">
              Sort By
            </label>&nbsp;
            <select
              id="sortby"
              onChange={e => this.handleChange(e.target.value)}
              defaultValue={sort}
              className="form-control"
            >
              <option value="-timestamp">Newest</option>
              <option value="timestamp">Oldest</option>
              <option value="-voteScore">Highest Score</option>
              <option value="voteScore">Lowest Score</option>
            </select>
          </div>
        )}
        <ul className="post__list list-unstyled">
          {sortedPosts.length > 0 &&
            sortedPosts.map(post => (
              <PostContainer
                key={post.id}
                post={post}
                component={PostListItem}
              />
            ))}
          {sortedPosts.length === 0 && (
            <div className="post__list__not__found text-center">
              Whoops! Looks like we don't have posts yet :(
            </div>
          )}
        </ul>
      </section>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  sort: PropTypes.oneOf(['-timestamp', 'timestamp', '-voteScore', 'voteScore'])
};

export default PostsList;
