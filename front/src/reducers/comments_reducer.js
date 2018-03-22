import * as Actions from 'actions/comment';

const comments = (state = {}, action) => {
  let comment;

  switch (action.type) {
    case Actions.FETCH_COMMENTS_BY_POST_SUCCESS:
      return action.payload.data.reduce((comments, comment) => {
        comments[comment.id] = comment;
        return comments;
      }, {});
    case Actions.FETCH_COMMENT_SUCCESS:
      comment = action.payload.data;
      if (Object.keys(comment).length > 0) {
        return {
          ...state,
          [comment.id]: comment
        };
      } else {
        return state;
      }
    case Actions.ADD_COMMENT_SUCCESS:
    case Actions.EDIT_COMMENT_SUCCESS:
    case Actions.VOTE_COMMENT_SUCCESS:
      comment = action.payload.data;
      return {
        ...state,
        [comment.id]: comment
      };
    case Actions.REMOVE_COMMENT_SUCCESS:
      comment = action.payload.data;
      return Object.keys(state)
        .filter(_ => _ !== comment.id)
        .reduce((comments, commentId) => {
          comments[commentId] = state[commentId];
          return comments;
        }, {});
    default:
      return state;
  }
};

export default comments;
