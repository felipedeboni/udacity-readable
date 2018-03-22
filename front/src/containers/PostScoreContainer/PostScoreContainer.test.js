import React from 'react';
import * as PostActions from 'actions/post';
import PostScoreContainer from './PostScoreContainer';

describe('PostScoreContainer', () => {
  const render = () => {
    const { postsObject } = global.mock;
    const [post] = global.mock.posts;
    const state = {
      posts: postsObject
    };

    const { component, store } = global.shallowWithStore(
      <PostScoreContainer id={post.id} />,
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

  it('renders the Score component correctly', () => {
    const { component, post } = render();
    const score = component.dive().dive();

    expect(
      score
        .find('.score__number')
        .text()
        .trim()
    ).toBe(post.voteScore.toString());
  });

  it('dispatch voteUp', () => {
    const { component, store } = render();
    const score = component.dive().dive();

    score.find('.score__vote--up').simulate('click');
    expect(
      store.getActions().find(_ => _.type === PostActions.VOTE_POST)
    ).toBeDefined();
  });

  it('dispatch voteDown', () => {
    const { component, store } = render();
    const score = component.dive().dive();

    score.find('.score__vote--down').simulate('click');
    expect(
      store.getActions().find(_ => _.type === PostActions.VOTE_POST)
    ).toBeDefined();
  });
});
