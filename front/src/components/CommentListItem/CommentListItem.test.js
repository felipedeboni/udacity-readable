import React from 'react';
import { shallow } from 'enzyme';
import CommentListItem from './CommentListItem';

describe('CommentListItem', () => {
  it('renders without crashing', () => {
    const [comment] = global.mock.comments;

    const test = (
      <CommentListItem
        category="react"
        comment={comment}
        removeHandler={jest.fn()}
      />
    );

    expect(shallow(test)).toMatchSnapshot();
  });
});
