import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'components/App/App.css';
import {
  CommentFormContainer,
  PostContainer,
  PostsListContainer,
  PostFormContainer
} from 'containers';

import { Header, Post, PageNotFound } from 'components';

const App = ({ categories }) => {
  const renderRouteOrNotFound = (props, component) => {
    const { match } = props;
    const categoriesArr = categories.map(_ => _.path);
    const matcher = new RegExp(`^(${categoriesArr.join('|')})`);
    if (matcher.test(match.params.category)) {
      return React.createElement(component, {
        ...props
      });
    } else {
      return <PageNotFound />;
    }
  };

  return categories ? (
    <div className="app container-fluid">
      <Header categories={categories} />
      <Switch>
        <Route
          exact
          path="/"
          children={props => <PostsListContainer category="" {...props} />}
        />
        <Route
          exact
          path="/posts/new"
          children={props => (
            <PostFormContainer categories={categories} {...props} />
          )}
        />
        <Route
          exact
          path="/comments/:comment/edit"
          render={_props => (
            <CommentFormContainer
              id={_props.match.params.comment}
              {..._props}
            />
          )}
        />
        <Route
          path="/:category"
          exact
          strict
          render={_props => {
            const props = {
              ..._props,
              category: _props.match.params.category
            };
            return renderRouteOrNotFound(props, PostsListContainer);
          }}
        />
        <Route
          exact
          path="/:category/:post"
          render={_props => {
            const props = {
              ..._props,
              postId: _props.match.params.post,
              component: Post
            };
            return renderRouteOrNotFound(props, PostContainer);
          }}
        />
        <Route
          exact
          path="/:category/:post/edit"
          render={_props => {
            const props = {
              ..._props,
              categories,
              id: _props.match.params.post
            };
            return renderRouteOrNotFound(props, PostFormContainer);
          }}
        />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </div>
  ) : (
    ''
  );
}

export default App;
