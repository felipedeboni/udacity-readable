import React from 'react';
import { shallow } from 'enzyme';
import * as PostActions from 'actions/post';
import ConnectedPostFormContainer, {
  PostFormContainer
} from './PostFormContainer';

describe('PostFormContainer', () => {
  const { jestPromise } = global;

  const render = () => {
    const [post] = global.mock.posts;
    const state = {
      posts: global.mock.postsObject
    };

    const { component, store } = global.shallowWithStore(
      <ConnectedPostFormContainer
        categories={global.mock.categories}
        id={post.id}
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
      <ConnectedPostFormContainer
        categories={global.mock.categories}
        id={post.id}
        match={{ params: { category: post.category } }}
        history={{ push: jest.fn(), replace: jest.fn() }}
      />,
      { posts: {} }
    );

    expect(component.dive()).toMatchSnapshot();
    expect(
      store.getActions().find(_ => _.type === PostActions.FETCH_POST)
    ).toBeDefined();
  });

  it('dispatch addPost', () => {
    const { component, store } = render();
    const form = component;

    form.props().add({});
    expect(
      store.getActions().find(_ => _.type === PostActions.ADD_POST)
    ).toBeDefined();
  });

  it('dispatch editPost', () => {
    const { component, store } = render();
    const form = component;

    form.props().edit({});
    expect(
      store.getActions().find(_ => _.type === PostActions.EDIT_POST)
    ).toBeDefined();
  });

  it('calls add on submit', () => {
    const addFn = jest
      .fn()
      .mockImplementation(() => new Promise(() => {}, () => {}));
    const component = shallow(
      <PostFormContainer categories={global.mock.categories} add={addFn} />
    );

    component.instance().onSubmit({});
    expect(addFn).toHaveBeenCalled();
  });

  it('calls edit on submit', () => {
    const [post] = global.mock.posts;

    const editFn = jest
      .fn()
      .mockImplementation(() => new Promise(() => {}, () => {}));
    const component = shallow(
      <PostFormContainer
        categories={global.mock.categories}
        id={post.id}
        post={post}
        edit={editFn}
      />
    );

    component.instance().onSubmit({});
    expect(editFn).toHaveBeenCalled();
  });

  it('should redirect after saving', () => {
    const addFn = jestPromise();
    const history = {
      push: jest.fn()
    };

    const component = shallow(
      <PostFormContainer
        categores={global.mock.categories}
        add={addFn}
        history={history}
      />
    );
    component.instance().afterSave({
      payload: {
        data: {
          id: 1,
          category: 'react'
        }
      }
    });
    component.instance().onSubmit({});
    expect(history.push).toHaveBeenCalledWith(`/react/1`);
  });
});
