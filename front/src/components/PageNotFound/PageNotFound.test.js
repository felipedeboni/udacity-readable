import React from 'react';
import { shallow } from 'enzyme';
import PageNotFound from './PageNotFound';

describe('Page not found', () => {
  it('renders without crashing', () => {
    const test = shallow(<PageNotFound />);

    expect(test).toMatchSnapshot();
  });
});
