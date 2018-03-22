import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/fontawesome-free-solid';
import { PostScoreContainer } from 'containers';
import react from 'react.svg';
import redux from './redux.svg';
import other from './other.svg';
import './PostListItem.css';

const PostListItem = ({
  post: { id, title, author, voteScore, commentCount, timestamp, category },
  removeHandler
}) => {
  const link = `/${category}/${id}`;
  let categoryLogo;
  let logoModifier = category;

  switch (category) {
    case 'react':
      categoryLogo = react;
      break;
    case 'redux':
      categoryLogo = redux;
      break;
    default:
      logoModifier = 'default';
      categoryLogo = other;
  }

  return (
    <li className="list__item">
      <div className="post__image">
        <Link to={link} className={`post__icon post__icon--${logoModifier}`}>
          <img src={categoryLogo} alt={category} />
        </Link>
      </div>
      <div className="list__item__data">
        <h2 className="post__title">
          <Link to={link}>{title}</Link>
        </h2>
        <div className="list__item__meta">
          <Moment
            className="post__date"
            date={timestamp}
            format="MMMM Do, YYYY"
          />
          <span className="separator"> • </span>
          <span>{author}</span>
          <span className="separator"> • </span>
          <span>
            {commentCount === 0 && 'No comments'}
            {commentCount > 0 && `${commentCount} comment`}
            {commentCount > 1 && 's'}
          </span>
        </div>
        <PostScoreContainer id={id} />
      </div>
      <div className="list__item__actions">
        <Link to={`${link}/edit`} className="list__item__actions__action">
          <FontAwesomeIcon icon={faEdit} />
        </Link>

        <a
          className="list__item__actions__action text-danger pointer"
          onClick={() => removeHandler(id)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </a>
      </div>
    </li>
  );
};

PostListItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired
  }).isRequired,
  removeHandler: PropTypes.func.isRequired
};

export default PostListItem;
