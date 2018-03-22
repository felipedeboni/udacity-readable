import reducer from './comments_reducer';
import * as Actions from 'actions/comment';

describe('comments reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle FETCH_COMMENTS_BY_POST_SUCCESS', () => {
    const { comments, commentsObject } = global.mock;
    const successAction = {
      type: Actions.FETCH_COMMENTS_BY_POST_SUCCESS,
      payload: {
        data: comments
      }
    };

    expect(reducer({}, successAction)).toEqual(commentsObject);
  });

  const mergeTest = action => {
    const { comments: [comment] } = global.mock;
    const successAction = {
      type: action,
      payload: {
        data: comment
      }
    };

    return expect(reducer({}, successAction)).toEqual({
      [comment.id]: comment
    });
  };

  it('should handle FETCH_COMMENT_SUCCESS', () =>
    mergeTest(Actions.FETCH_COMMENT_SUCCESS));
  it('should handle ADD_COMMENT_SUCCESS', () =>
    mergeTest(Actions.ADD_COMMENT_SUCCESS));
  it('should handle EDIT_COMMENT_SUCCESS', () =>
    mergeTest(Actions.EDIT_COMMENT_SUCCESS));
  it('should handle VOTE_COMMENT_SUCCESS', () =>
    mergeTest(Actions.VOTE_COMMENT_SUCCESS));

  it('should handle REMOVE_COMMENT_SUCCESS', () => {
    const { comments: [comment, otherComment] } = global.mock;
    const successAction = {
      type: Actions.REMOVE_COMMENT_SUCCESS,
      payload: {
        data: comment
      }
    };

    expect(reducer(global.mock.commentsObject, successAction)).toEqual({
      [otherComment.id]: otherComment
    });
  });
});
