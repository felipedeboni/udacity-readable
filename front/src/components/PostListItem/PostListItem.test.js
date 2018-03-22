import React from 'react';
import { shallow } from 'enzyme';
import PostListItem from './PostListItem';

const [postMock] = global.mock.posts;

describe('PostListItem', () => {
  it('renders without crashing', () => {
    const test = <PostListItem post={postMock} removeHandler={jest.fn} />;

    expect(shallow(test)).toMatchSnapshot();
  });

  it('renders the default category logo', () => {
    const post = {
      ...postMock,
      category: 'udacity'
    };
    const test = <PostListItem post={post} removeHandler={jest.fn} />;

    expect(shallow(test)).toMatchSnapshot();
  });

  it('renders the redux category logo', () => {
    const post = {
      ...postMock,
      category: 'redux'
    };
    const test = <PostListItem post={post} removeHandler={jest.fn} />;

    expect(shallow(test)).toMatchSnapshot();
  });

  it('renders the right string when there are no comments', () => {
    const post = {
      ...postMock,
      commentCount: 0
    };
    const wrapper = shallow(
      <PostListItem post={post} removeHandler={jest.fn} />
    );
    expect(wrapper.text()).toContain('No comments');
  });

  it('renders the right string when there are one comment', () => {
    const post = {
      ...postMock,
      commentCount: 1
    };
    const wrapper = shallow(
      <PostListItem post={post} removeHandler={jest.fn} />
    );
    expect(wrapper.text()).toContain('1 comment');
  });
});
