import React from 'react';
import { shallow } from 'enzyme';
import * as PostActions from 'actions/post';
import ConnectedPostsListContainer, {
  PostsListContainer
} from './PostsListContainer';

describe('PostsListContainer', () => {
  it('maps posts correctly', () => {
    const { postsObject } = global.mock;
    const { component } = global.shallowWithStore(
      <ConnectedPostsListContainer />,
      { posts: postsObject }
    );

    expect(component.dive().instance().props.posts).toEqual(global.mock.posts);
  });

  it('fetches all posts', () => {
    const { component, store } = global.shallowWithStore(
      <ConnectedPostsListContainer />,
      { posts: [] }
    );

    component.dive();

    expect(
      store.getActions().find(_ => _.type === PostActions.FETCH_ALL_POSTS)
    ).toBeDefined();
  });

  it('fetches posts by category', () => {
    const { component, store } = global.shallowWithStore(
      <ConnectedPostsListContainer category="react" />,
      { posts: [] }
    );

    component.dive();

    expect(
      store
        .getActions()
        .find(_ => _.type === PostActions.FETCH_POSTS_BY_CATEGORY)
    ).toBeDefined();
  });

  it('fetchCategory should be called when category changes', () => {
    const component = shallow(
      <PostsListContainer
        category="react"
        fetchAllPosts={jest.fn()}
        fetchPostsByCategory={jest.fn()}
      />
    );

    const instance = component.instance();
    const fetchCategory = jest.fn();
    instance.fetchCategory = fetchCategory;

    instance.componentWillReceiveProps({ category: 'redux' });

    expect(fetchCategory).toHaveBeenCalledWith('redux');
  });

  it('fetchCategory should not be called irrelevant props changes', () => {
    const component = shallow(
      <PostsListContainer
        category="react"
        fetchAllPosts={jest.fn()}
        fetchPostsByCategory={jest.fn()}
      />
    );

    const instance = component.instance();
    const fetchCategory = jest.fn();
    instance.fetchCategory = fetchCategory;

    instance.componentWillReceiveProps({});

    expect(fetchCategory).toHaveBeenCalledTimes(0);
  });
});
