import 'raf/polyfill';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import axiosMiddleware from 'redux-axios-middleware';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

var mockAxios = axios.create();
global.MockApi = new MockAdapter(mockAxios);
const middlewares = [axiosMiddleware(mockAxios)];
const mockStore = configureMockStore(middlewares);
global.store = mockStore();
global.shallowWithStore = (component, store) => {
  store = mockStore(store);
  const context = {
    store
  };
  return {
    component: shallow(component, { context }),
    store
  };
};

global.jestPromise = () =>
  jest.fn().mockImplementation(() => new Promise(() => {}, () => {}));

global.mock = {};
global.mock.response = {};
global.mock.categories = [
  {
    name: 'react',
    path: 'react'
  },
  {
    name: 'redux',
    path: 'redux'
  },
  {
    name: 'udacity',
    path: 'udacity'
  }
];

global.mock.posts = [
  {
    id: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1467166872634,
    title: 'Udacity is the best place to learn React',
    body: 'Everyone says so after all.',
    author: 'thingtwo',
    category: 'react',
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body: 'Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5,
    deleted: false,
    commentCount: 0
  }
];

global.mock.postsObject = global.mock.posts.reduce((posts, post) => {
  posts[post.id] = post;
  return posts;
}, {});

global.mock.comments = [
  {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  {
    id: '8tu4bsun805n8un48ve89',
    parentId: '8xf0y6ziyjabvozdd253nd',
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  }
];

global.mock.commentsObject = global.mock.comments.reduce(
  (comments, comment) => {
    comments[comment.id] = comment;
    return comments;
  },
  {}
);
