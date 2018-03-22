import React from 'react';
import ConnectedCommentsListContainer from './CommentsListContainer';

describe('CommentsListContainer', () => {
  it('renders the loading', () => {
    const [comment] = global.mock.comments;
    const { component } = global.shallowWithStore(
      <ConnectedCommentsListContainer
        category="react"
        postId={comment.parentId}
      />,
      { comments: [] }
    );

    expect(component.dive()).toMatchSnapshot();
  });

  it('maps comments correctly', () => {
    const { commentsObject } = global.mock;
    const [comment] = global.mock.comments;
    const { component } = global.shallowWithStore(
      <ConnectedCommentsListContainer
        category="react"
        postId={comment.parentId}
      />,
      { comments: commentsObject }
    );

    expect(component.dive().instance().props.comments).toEqual(
      global.mock.comments
    );
  });
});
