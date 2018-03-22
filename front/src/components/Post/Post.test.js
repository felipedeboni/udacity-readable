import React from 'react';
import { shallow } from 'enzyme';
import Post from './Post';

describe('Post', () => {
  it('renders without crashing', () => {
    const [post] = global.mock.posts;

    const test = <Post post={post} />;

    expect(shallow(test)).toMatchSnapshot();
  });
});
