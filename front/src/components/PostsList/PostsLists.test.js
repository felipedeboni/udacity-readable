import React from 'react';
import { shallow } from 'enzyme';
import PostsList from './PostsList';
import { PostContainer } from 'containers';

const { posts } = global.mock;

describe('PostList', () => {
  it('renders without crashing', () => {
    const test = <PostsList posts={posts} sort="-timestamp" />;

    expect(shallow(test)).toMatchSnapshot();
  });

  it('renders with empty message', () => {
    const test = <PostsList posts={[]} />;

    expect(shallow(test)).toMatchSnapshot();
  });

  it('should handle change', () => {
    const test = shallow(<PostsList posts={posts} sort="-timestamp" />);
    const instance = test.instance();
    const handleChange = jest.fn();
    instance.handleChange = handleChange;
    test.find('.form-inline select').simulate('change', {
      target: {
        value: 'voteScore'
      }
    });
    expect(handleChange).toHaveBeenCalled();
  });

  it('should sort', () => {
    const test = shallow(<PostsList posts={posts} sort="-timestamp" />);
    test.find('.form-inline select').simulate('change', {
      target: {
        value: '-voteScore'
      }
    });
    test.update();

    const firstScore = test
      .find(PostContainer)
      .first()
      .props().post.voteScore;
    const lastScore = test
      .find(PostContainer)
      .last()
      .props().post.voteScore;
    expect(firstScore > lastScore).toBe(true);
  });
});
