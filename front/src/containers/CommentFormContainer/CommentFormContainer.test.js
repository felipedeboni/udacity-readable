import React from 'react';
import { shallow } from 'enzyme';
import * as CommentActions from 'actions/comment';
import ConnectedCommentFormContainer, {
  CommentFormContainer
} from './CommentFormContainer';

describe('CommentFormContainer', () => {
  const { jestPromise } = global;

  const render = commentId => {
    const [comment] = global.mock.comments;
    const state = {
      comments: global.mock.commentsObject,
      posts: global.mock.posts
    };

    const { component, store } = global.shallowWithStore(
      <ConnectedCommentFormContainer
        postId={comment.parentId}
        id={commentId || comment.id}
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
    const { posts: [post], comments: [comment] } = global.mock;
    const { component, store } = global.shallowWithStore(
      <ConnectedCommentFormContainer
        postId={post.id}
        id={comment.id}
        history={{ push: jest.fn(), replace: jest.fn() }}
        fetchPost={jest.fn()}
      />,
      { comments: {}, posts: {} }
    );

    expect(component.dive()).toMatchSnapshot();
    expect(
      store.getActions().find(_ => _.type === CommentActions.FETCH_COMMENT)
    ).toBeDefined();
  });

  it('dispatch addComment', () => {
    const { component, store } = render();
    const form = component;

    form.props().add(1, {});
    expect(
      store.getActions().find(_ => _.type === CommentActions.ADD_COMMENT)
    ).toBeDefined();
  });

  it('dispatch editComment', () => {
    const { component, store } = render();
    const form = component;

    form.props().edit({});
    expect(
      store.getActions().find(_ => _.type === CommentActions.EDIT_COMMENT)
    ).toBeDefined();
  });

  it('calls add on submit', () => {
    const addFn = jestPromise();
    const component = shallow(<CommentFormContainer add={addFn} />);

    component.instance().onSubmit({});
    expect(addFn).toHaveBeenCalled();
  });

  it('calls edit on submit', () => {
    const [comment] = global.mock.comments;

    const editFn = jestPromise();
    const component = shallow(
      <CommentFormContainer
        categories={global.mock.categories}
        id={comment.id}
        comment={comment}
        edit={editFn}
        fetchPost={jest.fn()}
      />
    );

    component.instance().onSubmit({});
    expect(editFn).toHaveBeenCalled();
  });

  it('should not redirect after saving on add', () => {
    const addFn = jestPromise();
    const history = {
      push: jest.fn()
    };

    const component = shallow(
      <CommentFormContainer postId={1} add={addFn} history={history} />
    );
    component.instance().afterSave({
      payload: {
        data: {
          parentId: 1
        }
      }
    });
    component.instance().onSubmit({});
    expect(history.push).toHaveBeenCalledTimes(0);
  });

  it('should redirect after saving on edit', () => {
    const [comment] = global.mock.comments;
    const post = global.mock.postsObject[comment.parentId];
    const editFn = jestPromise();
    const history = {
      push: jest.fn()
    };

    const component = shallow(
      <CommentFormContainer
        id={comment.id}
        postId={comment.parentId}
        comment={comment}
        edit={editFn}
        history={history}
        post={post}
      />
    );
    component.instance().afterSave({
      payload: {
        data: {
          parentId: comment.parentId
        }
      }
    });
    component.instance().onSubmit({});
    expect(history.push).toHaveBeenCalledWith(
      `/${post.category}/${comment.parentId}`
    );
  });
});
