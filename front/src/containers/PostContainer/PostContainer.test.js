import React from 'react';
import * as PostActions from 'actions/post';
import PostContainer from './PostContainer';
import { Post } from 'components';

describe('PostContainer', () => {
  const render = () => {
    const [post] = global.mock.posts;
    const state = {
      posts: global.mock.postsObject
    };

    const { component, store } = global.shallowWithStore(
      <PostContainer
        postId={post.id}
        match={{ params: { category: post.category } }}
        component={Post}
      />,
      state
    );

    return {
      component,
      store,
      post
    };
  };

  it('renders without crashing', () => {
    const { component } = render();

    expect(component.dive()).toMatchSnapshot();
  });

  it('fetches the post', () => {
    const [post] = global.mock.posts;
    const { component, store } = global.shallowWithStore(
      <PostContainer
        id={post.id}
        match={{ params: { category: post.category } }}
        component={Post}
        history={{ push: jest.fn(), replace: jest.fn() }}
      />,
      { posts: {} }
    );

    expect(component.dive()).toMatchSnapshot();
    expect(
      store.getActions().find(_ => _.type === PostActions.FETCH_POST)
    ).toBeDefined();
  });

  it('dispatch removePost', () => {
    const { component, store } = render();
    const form = component;

    form.props().remove({});
    expect(
      store.getActions().find(_ => _.type === PostActions.REMOVE_POST)
    ).toBeDefined();
  });
});
