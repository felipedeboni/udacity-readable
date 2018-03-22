import uuid from 'utils/uuid';

// GET /posts/:id/comments
// Get all the comments for a single post.
export const FETCH_COMMENTS_BY_POST = 'FETCH_COMMENTS_BY_POST';
export const FETCH_COMMENTS_BY_POST_SUCCESS = 'FETCH_COMMENTS_BY_POST_SUCCESS';
export const FETCH_COMMENTS_BY_POST_FAIL = 'FETCH_COMMENTS_BY_POST_FAIL';
export const fetchCommentsByPost = postId => {
  return {
    type: FETCH_COMMENTS_BY_POST,
    payload: {
      request: {
        url: `/posts/${postId}/comments`
      }
    }
  };
};

// GET /comments/:id
// Get the details for a single comment.
export const FETCH_COMMENT = 'FETCH_COMMENT';
export const FETCH_COMMENT_SUCCESS = 'FETCH_COMMENT_SUCCESS';
export const FETCH_COMMENT_FAIL = 'FETCH_COMMENT_FAIL';
export const fetchComment = id => {
  return {
    type: FETCH_COMMENT,
    payload: {
      request: {
        url: `/comments/${id}`
      }
    }
  };
};

// POST /comments
// Add a comment to a post.
export const ADD_COMMENT = 'ADD_COMMENT';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAIL = 'ADD_COMMENT_FAIL';
export const addComment = (parentId, values) => {
  const { author, body } = values;
  const data = {
    id: uuid(),
    timestamp: Date.now(),
    parentId,
    author,
    body
  };

  return {
    type: ADD_COMMENT,
    payload: {
      request: {
        method: 'POST',
        url: '/comments',
        data
      }
    }
  };
};

// PUT /comments/:id
// Edit the details of an existing comment.
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const EDIT_COMMENT_SUCCESS = 'EDIT_COMMENT_SUCCESS';
export const EDIT_COMMENT_FAIL = 'EDIT_COMMENT_FAIL';
export const editComment = (id, data) => {
  return {
    type: EDIT_COMMENT,
    payload: {
      request: {
        method: 'PUT',
        url: `/comments/${id}`,
        data
      }
    }
  };
};

// DELETE /comments/:id
// Sets a comment's deleted flag to true.
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const REMOVE_COMMENT_SUCCESS = 'REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_FAIL = 'REMOVE_COMMENT_FAIL';
export const removeComment = id => {
  return {
    type: REMOVE_COMMENT,
    payload: {
      request: {
        method: 'DELETE',
        url: `/comments/${id}`
      }
    }
  };
};

// POST /comments/:id
// Used for voting on a comment.
export const VOTE_COMMENT = 'VOTE_COMMENT';
export const VOTE_COMMENT_SUCCESS = 'VOTE_COMMENT_SUCCESS';
export const VOTE_COMMENT_FAIL = 'VOTE_COMMENT_FAIL';
const vote = (id, type) => {
  return {
    type: VOTE_COMMENT,
    payload: {
      request: {
        method: 'POST',
        url: `/comments/${id}`,
        data: {
          option: type
        }
      }
    }
  };
};

export const voteCommentUp = id => {
  return vote(id, 'upVote');
};

export const voteCommentDown = id => {
  return vote(id, 'downVote');
};
