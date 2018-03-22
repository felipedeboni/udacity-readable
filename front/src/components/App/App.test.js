import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

const categoriesMock = [
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

describe('App', () => {
  it('renders without crashing', () => {
    const test = <App />;

    expect(shallow(test)).toMatchSnapshot();
  });

  it('renders with categories', () => {
    const test = <App categories={categoriesMock} />;

    expect(shallow(test)).toMatchSnapshot();
  });
});
