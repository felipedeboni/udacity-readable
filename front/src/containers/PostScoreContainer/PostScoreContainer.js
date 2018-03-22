import React from 'react';
import { connect } from 'react-redux';
import { votePostUp, votePostDown } from 'actions/post';
import { Score } from 'components';

const PostScoreContainer = ({ id, score, voteUp, voteDown }) => {
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
  const post = state.posts[ownProps.id];
  return {
    score: post.voteScore
  };
};

const mapDispatch = dispatch => {
  return {
    voteUp: postId => dispatch(votePostUp(postId)),
    voteDown: postId => dispatch(votePostDown(postId))
  };
};

export default connect(mapProps, mapDispatch)(PostScoreContainer);
