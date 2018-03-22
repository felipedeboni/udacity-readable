import * as Actions from 'actions/post';

const posts = (state = {}, action) => {
  let post;

  switch (action.type) {
    case Actions.FETCH_ALL_POSTS_SUCCESS:
    case Actions.FETCH_POSTS_BY_CATEGORY_SUCCESS:
      return action.payload.data.reduce((posts, post) => {
        posts[post.id] = post;
        return posts;
      }, {});
    case Actions.FETCH_POST_SUCCESS:
      post = action.payload.data;
      if (Object.keys(post).length > 0) {
        return {
          ...state,
          [post.id]: post
        };
      } else {
        return state;
      }
    case Actions.ADD_POST_SUCCESS:
    case Actions.EDIT_POST_SUCCESS:
    case Actions.VOTE_POST_SUCCESS:
      post = action.payload.data;
      return {
        ...state,
        [post.id]: post
      };
    case Actions.REMOVE_POST_SUCCESS:
      post = action.payload.data;
      return Object.keys(state)
        .filter(_ => _ !== post.id)
        .reduce((posts, postId) => {
          posts[postId] = state[postId];
          return posts;
        }, {});
    default:
      return state;
  }
};

export default posts;
