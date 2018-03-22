import React from 'react';
import Header from './Header';
import { shallow } from 'enzyme';

describe('Header', () => {
  it('renders without crashing', () => {
    const test = <Header />;

    expect(shallow(test)).toMatchSnapshot();
  });

  it('renders without crashing with categories', () => {
    const { categories } = global.mock;

    const test = <Header categories={categories} />;

    expect(shallow(test)).toMatchSnapshot();
  });
});
