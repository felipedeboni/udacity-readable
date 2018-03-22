import * as Comment from 'actions/comment';
const { MockApi, store } = global;

it('dispatches FETCH_COMMENTS_BY_POST_SUCCESS', () => {
  MockApi.onGet(`/posts/1/comments`).reply(200, {});
  const expectedAction = { type: Comment.FETCH_COMMENTS_BY_POST_SUCCESS };

  return store.dispatch(Comment.fetchCommentsByPost(1)).then(() => {
    expect(
      store.getActions().find(_ => _.type === expectedAction.type)
    ).toBeDefined();
  });
});

it('dispatches FETCH_COMMENT_SUCCESS', () => {
  MockApi.onGet('/comments/1').reply(200, {});
  const expectedAction = { type: Comment.FETCH_COMMENT_SUCCESS };

  return store.dispatch(Comment.fetchComment(1)).then(() => {
    expect(
      store.getActions().find(_ => _.type === expectedAction.type)
    ).toBeDefined();
  });
});

it('dispatches ADD_COMMENT_SUCCESS', () => {
  MockApi.onPost('/comments').reply(200, {});
  const expectedAction = { type: Comment.ADD_COMMENT_SUCCESS };

  return store
    .dispatch(Comment.addComment(1, { author: 'author', body: 'body' }))
    .then(() => {
      expect(
        store.getActions().find(_ => _.type === expectedAction.type)
      ).toBeDefined();
    });
});

it('dispatches EDIT_COMMENT_SUCCESS', () => {
  MockApi.onPut('/comments/1').reply(200, {});
  const expectedAction = { type: Comment.EDIT_COMMENT_SUCCESS };

  return store.dispatch(Comment.editComment(1, { author: 'John' })).then(() => {
    expect(
      store.getActions().find(_ => _.type === expectedAction.type)
    ).toBeDefined();
  });
});

it('dispatches REMOVE_COMMENT_SUCCESS', () => {
  MockApi.onDelete('/comments/1').reply(200, {});
  const expectedAction = { type: Comment.REMOVE_COMMENT_SUCCESS };

  return store.dispatch(Comment.removeComment(1)).then(() => {
    expect(
      store.getActions().find(_ => _.type === expectedAction.type)
    ).toBeDefined();
  });
});

it('dispatches VOTE_COMMENT_SUCCESS for voteCommentUp', () => {
  MockApi.onPost('/comments/1').reply(200, {});
  const expectedAction = { type: Comment.VOTE_COMMENT_SUCCESS };

  return store.dispatch(Comment.voteCommentUp(1)).then(() => {
    expect(
      store.getActions().find(_ => _.type === expectedAction.type)
    ).toBeDefined();
  });
});

it('dispatches VOTE_COMMENT_SUCCESS for voteCommentDown', () => {
  MockApi.onPost('/comments/1').reply(200, {});
  const expectedAction = { type: Comment.VOTE_COMMENT_SUCCESS };

  return store.dispatch(Comment.voteCommentDown(1)).then(() => {
    expect(
      store.getActions().find(_ => _.type === expectedAction.type)
    ).toBeDefined();
  });
});
