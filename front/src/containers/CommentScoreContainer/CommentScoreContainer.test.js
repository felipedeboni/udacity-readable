import React from 'react';
import * as CommentActions from 'actions/comment';
import CommentScoreContainer from './CommentScoreContainer';

describe('CommentScoreContainer', () => {
  const render = () => {
    const { commentsObject } = global.mock;
    const [comment] = global.mock.comments;
    const state = {
      comments: commentsObject
    };

    const { component, store } = global.shallowWithStore(
      <CommentScoreContainer id={comment.id} />,
      state
    );

    return {
      component,
      store,
      comment
    };
  };

  it('renders without crashing', () => {
    const { component } = render();

    expect(component.dive()).toMatchSnapshot();
  });

  it('renders the Score component correctly', () => {
    const { component, comment } = render();
    const score = component.dive().dive();

    expect(
      score
        .find('.score__number')
        .text()
        .trim()
    ).toBe(comment.voteScore.toString());
  });

  it('dispatch voteUp', () => {
    const { component, store } = render();
    const score = component.dive().dive();

    score.find('.score__vote--up').simulate('click');
    expect(
      store.getActions().find(_ => _.type === CommentActions.VOTE_COMMENT)
    ).toBeDefined();
  });

  it('dispatch voteDown', () => {
    const { component, store } = render();
    const score = component.dive().dive();

    score.find('.score__vote--down').simulate('click');
    expect(
      store.getActions().find(_ => _.type === CommentActions.VOTE_COMMENT)
    ).toBeDefined();
  });
});
