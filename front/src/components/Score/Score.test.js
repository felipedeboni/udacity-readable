import React from 'react';
import Score from './Score';
import { shallow, mount } from 'enzyme';

describe('Score', () => {
  it('renders without crashing', () => {
    const onVoteUp = jest.fn();
    const onVoteDown = jest.fn();
    const test = (
      <Score id="1" score={1} onVoteUp={onVoteUp} onVoteDown={onVoteDown} />
    );

    expect(shallow(test)).toMatchSnapshot();
  });

  it('calls vote up', () => {
    const onVoteUp = jest.fn();
    const onVoteDown = jest.fn();
    const test = mount(
      <Score id="1" score={1} onVoteUp={onVoteUp} onVoteDown={onVoteDown} />
    );
    test
      .find('.score__vote--up')
      .first()
      .simulate('click');
    expect(onVoteUp).toHaveBeenCalled();
  });

  it('calls vote down', () => {
    const onVoteUp = jest.fn();
    const onVoteDown = jest.fn();
    const test = mount(
      <Score id="1" score={1} onVoteUp={onVoteUp} onVoteDown={onVoteDown} />
    );
    test
      .find('.score__vote--down')
      .first()
      .simulate('click');
    expect(onVoteDown).toHaveBeenCalled();
  });
});
