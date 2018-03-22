import uuid from 'utils/uuid';

// GET /posts
// Get all of the posts. Useful for the main page when no category is selected.
export const FETCH_ALL_POSTS = 'FETCH_ALL_POSTS';
export const FETCH_ALL_POSTS_SUCCESS = 'FETCH_ALL_POSTS_SUCCESS';
export const FETCH_ALL_POSTS_FAIL = 'FETCH_ALL_POSTS_FAIL';
export const fetchAllPosts = () => {
  return {
    type: FETCH_ALL_POSTS,
    payload: {
      request: {
        url: `/posts`
      }
    }
  };
};

// GET /:category/posts
// Get all of the posts for a particular category.
export const FETCH_POSTS_BY_CATEGORY = 'FETCH_POSTS_BY_CATEGORY';
export const FETCH_POSTS_BY_CATEGORY_SUCCESS =
  'FETCH_POSTS_BY_CATEGORY_SUCCESS';
export const FETCH_POSTS_BY_CATEGORY_FAIL = 'FETCH_POSTS_BY_CATEGORY_FAIL';
export const fetchPostsByCategory = categoryId => {
  return {
    type: FETCH_POSTS_BY_CATEGORY,
    payload: {
      request: {
        url: `/${categoryId}/posts`
      }
    }
  };
};

// GET /posts/:id
// Get the details of a single post.
export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAIL = 'FETCH_POST_FAIL';
export const fetchPost = id => {
  return {
    type: FETCH_POST,
    payload: {
      request: {
        url: `/posts/${id}`
      }
    }
  };
};

// POST /posts
// Add a new post.
export const ADD_POST = 'ADD_POST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAIL = 'ADD_POST_FAIL';
export const addPost = ({ category, author, title, body }) => {
  const data = {
    id: uuid(),
    timestamp: Date.now(),
    category,
    author,
    title,
    body
  };

  return {
    type: ADD_POST,
    payload: {
      request: {
        method: 'POST',
        url: '/posts',
        data
      }
    }
  };
};

// PUT /posts/:id
// Edit the details of an existing post.
export const EDIT_POST = 'EDIT_POST';
export const EDIT_POST_SUCCESS = 'EDIT_POST_SUCCESS';
export const EDIT_POST_FAIL = 'EDIT_POST_FAIL';
export const editPost = (id, data) => {
  return {
    type: EDIT_POST,
    payload: {
      request: {
        method: 'PUT',
        url: `/posts/${id}`,
        data
      }
    }
  };
};

// DELETE /posts/:id
// Sets the deleted flag for a post to 'true'.
// Sets the parentDeleted flag for all child comments to 'true'.
export const REMOVE_POST = 'REMOVE_POST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAIL = 'REMOVE_POST_FAIL';
export const removePost = id => {
  return {
    type: REMOVE_POST,
    payload: {
      id: id,
      request: {
        method: 'DELETE',
        url: `/posts/${id}`
      }
    }
  };
};

// POST /posts/:id
// Used for voting on a post.
export const VOTE_POST = 'VOTE_POST';
export const VOTE_POST_SUCCESS = 'VOTE_POST_SUCCESS';
export const VOTE_POST_FAIL = 'VOTE_POST_FAIL';
const vote = (id, type) => {
  return {
    type: VOTE_POST,
    payload: {
      request: {
        method: 'POST',
        url: `/posts/${id}`,
        data: {
          option: type
        }
      }
    }
  };
};

export const votePostUp = id => {
  return vote(id, 'upVote');
};

export const votePostDown = id => {
  return vote(id, 'downVote');
};
