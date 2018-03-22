import React from 'react';
import { shallow } from 'enzyme';
import CommentsList from './CommentsList';

describe('CommentsList', () => {
  it('renders without crashing', () => {
    const { comments } = global.mock;

    const test = (
      <CommentsList category="react" comments={comments} postId="1" />
    );

    expect(shallow(test)).toMatchSnapshot();
  });
});
