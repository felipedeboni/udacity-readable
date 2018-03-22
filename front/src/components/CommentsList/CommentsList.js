import React from 'react';
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import { CommentListItem } from 'components';
import { CommentFormContainer, CommentContainer } from 'containers';
import './CommentsList.css';

const CommentsList = ({ postId, comments, category }) => {
  const sortedComments = comments.sort(sortBy('-timestamp'));
  const commentsCount = sortedComments.length;
  return (
    <section className="comments">
      <div className="comments__counter">
        {commentsCount === 0 && 'No comments'}
        {commentsCount > 0 && `${commentsCount} comment`}
        {commentsCount > 1 && 's'}
      </div>
      <ul className="comments__list list-unstyled">
        <li className="comments__form">
          <CommentFormContainer postId={postId} />
        </li>
        {sortedComments.map(comment => (
          <CommentContainer
            key={comment.id}
            comment={comment}
            component={CommentListItem}
          />
        ))}
      </ul>
    </section>
  );
};

CommentsList.propTypes = {
  postId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired
};

export default CommentsList;
