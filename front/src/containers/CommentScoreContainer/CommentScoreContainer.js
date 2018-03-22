import React from 'react';
import { connect } from 'react-redux';
import { voteCommentUp, voteCommentDown } from 'actions/comment';
import { Score } from 'components';

const CommentScoreContainer = ({ id, score, voteUp, voteDown }) => {
  return (
    <Score
      id={id}
      score={score}
      onVoteUp={voteUp}
      onVoteDown={voteDown}
    />
  );
}

const mapProps = (state, ownProps) => {
  const comment = state.comments[ownProps.id];
  return {
    score: comment.voteScore
  };
};

const mapDispatch = dispatch => {
  return {
    voteUp: commentId => dispatch(voteCommentUp(commentId)),
    voteDown: commentId => dispatch(voteCommentDown(commentId))
  };
};

export default connect(mapProps, mapDispatch)(CommentScoreContainer);
