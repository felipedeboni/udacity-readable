import * as Post from 'actions/post';
const { MockApi, store } = global;

it('dispatches FETCH_ALL_POSTS_SUCCESS', () => {
  MockApi.onGet(`/posts`).reply(200, {});
  const expectedAction = { type: Post.FETCH_ALL_POSTS_SUCCESS };

  return store.dispatch(Post.fetchAllPosts(1)).then(() => {
    expect(
      store.getActions().find(_ => _.type === expectedAction.type)
    ).toBeDefined();
  });
});

it('dispatches FETCH_POSTS_BY_CATEGORY_SUCCESS', () => {
  MockApi.onGet('/react/posts').reply(200, {});
  const expectedAction = { type: Post.FETCH_POSTS_BY_CATEGORY_SUCCESS };

  return store.dispatch(Post.fetchPostsByCategory('react')).then(() => {
    expect(
      store.getActions().find(_ => _.type === expectedAction.type)
    ).toBeDefined();
  });
});

it('dispatches FETCH_POST_SUCCESS', () => {
  MockApi.onGet('/posts/1').reply(200, {});
  const expectedAction = { type: Post.FETCH_POST_SUCCESS };

  return store.dispatch(Post.fetchPost(1)).then(() => {
    expect(
      store.getActions().find(_ => _.type === expectedAction.type)
    ).toBeDefined();
  });
});

it('dispatches ADD_POST_SUCCESS', () => {
  MockApi.onPost('/posts').reply(200, {});
  const expectedAction = { type: Post.ADD_POST_SUCCESS };

  return store
    .dispatch(
      Post.addPost({
        category: 'react',
        author: 'John',
        title: 'Title',
        body: 'body'
      })
    )
    .then(() => {
      expect(
        store.getActions().find(_ => _.type === expectedAction.type)
      ).toBeDefined();
    });
});

it('dispatches EDIT_POST_SUCCESS', () => {
  MockApi.onPut('/posts/1').reply(200, {});
  const expectedAction = { type: Post.EDIT_POST_SUCCESS };

  return store.dispatch(Post.editPost(1, { author: 'John' })).then(() => {
    expect(
      store.getActions().find(_ => _.type === expectedAction.type)
    ).toBeDefined();
  });
});

it('dispatches REMOVE_POST_SUCCESS', () => {
  MockApi.onDelete('/posts/1').reply(200, {});
  const expectedAction = { type: Post.REMOVE_POST_SUCCESS };

  return store.dispatch(Post.removePost(1)).then(() => {
    expect(
      store.getActions().find(_ => _.type === expectedAction.type)
    ).toBeDefined();
  });
});

it('dispatches VOTE_POST_SUCCESS for votePostUp', () => {
  MockApi.onPost('/posts/1').reply(200, {});
  const expectedAction = { type: Post.VOTE_POST_SUCCESS };

  return store.dispatch(Post.votePostUp(1)).then(() => {
    expect(
      store.getActions().find(_ => _.type === expectedAction.type)
    ).toBeDefined();
  });
});

it('dispatches VOTE_POST_SUCCESS for votePostDown', () => {
  MockApi.onPost('/posts/1').reply(200, {});
  const expectedAction = { type: Post.VOTE_POST_SUCCESS };

  return store.dispatch(Post.votePostDown(1)).then(() => {
    expect(
      store.getActions().find(_ => _.type === expectedAction.type)
    ).toBeDefined();
  });
});
