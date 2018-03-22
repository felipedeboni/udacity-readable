import React from 'react';
import * as CommentActions from 'actions/comment';
import CommentContainer from './CommentContainer';
import { CommentListItem } from 'components';

describe('CommentContainer', () => {
  const render = commentId => {
    const [comment] = global.mock.comments;
    const state = {
      comments: global.mock.commentsObject
    };

    const { component, store } = global.shallowWithStore(
      <CommentContainer
        commentId={commentId || comment.id}
        component={CommentListItem}
      />,
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

  it('fetches the comment', () => {
    const [, comment] = global.mock.comments;

    const { component, store } = global.shallowWithStore(
      <CommentContainer
        commentId={comment.id}
        component={CommentListItem}
        history={{ push: jest.fn(), replace: jest.fn() }}
      />,
      { comments: {} }
    );

    expect(component).toMatchSnapshot();
    component.dive();
    expect(
      store.getActions().find(_ => _.type === CommentActions.FETCH_COMMENT)
    ).toBeDefined();
  });

  it('dispatch removeComment', () => {
    const { component, store } = render();
    const form = component;

    form.props().remove({});
    expect(
      store.getActions().find(_ => _.type === CommentActions.REMOVE_COMMENT)
    ).toBeDefined();
  });
});
