import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/fontawesome-free-solid';
import { CommentScoreContainer } from 'containers';
import './CommentListItem.css';

const CommentListItem = ({
  category,
  comment: { id, author, body, parentId, timestamp },
  removeHandler
}) => {
  return (
    <li className="comment__list__item">
      <div className="list__item__data">
        <div className="comment__body">
          <p>{body}</p>
        </div>

        <div className="list__item__meta">
          <Moment date={timestamp} format="MMMM Do, YYYY" />
          <span className="separator"> • </span>
          <span>{author}</span>
        </div>

        <CommentScoreContainer id={id} />
      </div>
      <div className="list__item__actions">
        <Link
          className="list__item__actions__action"
          to={`/comments/${id}/edit`}
        >
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

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    parentId: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    voteScore: PropTypes.number.isRequired,
    deleted: PropTypes.bool.isRequired,
    parentDeleted: PropTypes.bool.isRequired
  }).isRequired,
  removeHandler: PropTypes.func.isRequired
};

export default CommentListItem;
