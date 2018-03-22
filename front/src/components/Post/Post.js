import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/fontawesome-free-solid';
import { PostScoreContainer, CommentsListContainer } from 'containers';
import { REMOVE_POST_SUCCESS } from 'actions/post';
import './Post.css';

const Post = ({ post, removeHandler, history }) => {
  const { id, title, body, author, category, timestamp } = post;
  const link = `/${category}/${id}`;

  const afterRemove = action => {
    if (action.type === REMOVE_POST_SUCCESS) {
      history.push(`/${category}`);
    }
  };

  return (
    <article className="post__item">
      <div className="post__item__actions">
        <Link to={`${link}/edit`} className="list__item__actions__action">
          <FontAwesomeIcon icon={faEdit} />
        </Link>

        <a
          className="list__item__actions__action text-danger pointer"
          onClick={() => removeHandler(id).then(afterRemove)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </a>
      </div>
      <h1 className="post__item__title">{title}</h1>
      <div className="post__item__details text-muted text-italic">
        <Moment date={timestamp} format="MMMM Do, YYYY" />
        <span className="separator"> • </span>
        <span>{author}</span>
      </div>
      <p className="post__item__body">{body}</p>

      <PostScoreContainer id={id} />

      <CommentsListContainer postId={id} category={category} />
    </article>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired
  }).isRequired
};

export default Post;
