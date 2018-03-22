import reducer from './posts_reducer';
import * as Actions from 'actions/post';

describe('posts reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle FETCH_ALL_POSTS_SUCCESS', () => {
    const { posts, postsObject } = global.mock;
    const successAction = {
      type: Actions.FETCH_ALL_POSTS_SUCCESS,
      payload: {
        data: posts
      }
    };

    expect(reducer({}, successAction)).toEqual(postsObject);
  });

  it('should handle FETCH_POSTS_BY_CATEGORY_SUCCESS', () => {
    const { posts, postsObject } = global.mock;
    const successAction = {
      type: Actions.FETCH_ALL_POSTS_SUCCESS,
      payload: {
        data: posts
      }
    };

    expect(reducer({}, successAction)).toEqual(postsObject);
  });

  const mergeTest = action => {
    const { posts: [post] } = global.mock;
    const successAction = {
      type: action,
      payload: {
        data: post
      }
    };

    return expect(reducer({}, successAction)).toEqual({
      [post.id]: post
    });
  };
  it('should handle FETCH_POST_SUCCESS', () =>
    mergeTest(Actions.FETCH_POST_SUCCESS));
  it('should handle ADD_POST_SUCCESS', () =>
    mergeTest(Actions.ADD_POST_SUCCESS));
  it('should handle EDIT_POST_SUCCESS', () =>
    mergeTest(Actions.EDIT_POST_SUCCESS));
  it('should handle VOTE_POST_SUCCESS', () =>
    mergeTest(Actions.VOTE_POST_SUCCESS));

  it('should handle REMOVE_POST_SUCCESS', () => {
    const { posts: [post, otherPost] } = global.mock;
    const successAction = {
      type: Actions.REMOVE_POST_SUCCESS,
      payload: {
        data: post
      }
    };

    expect(reducer(global.mock.postsObject, successAction)).toEqual({
      [otherPost.id]: otherPost
    });
  });
});
