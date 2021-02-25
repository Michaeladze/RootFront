import { shallow } from 'enzyme';
import React from 'react';
import Button from './Button';

describe('Test <Button /> component', () => {
  it('Should render <Button /> component with text "Button"', () => {
    const button = <Button>Button</Button>;
    const wrapper = shallow(button);
    expect(wrapper.text()).toBe('Button');
  });

  it('Should have "rf-button--outline-secondary" class', () => {
    const wrapper = shallow(<Button buttonType='outlineSecondary'>Button</Button>);
    expect(wrapper.hasClass('rf-button--outline-secondary')).toBeTruthy();
  });

  it('Should change "state" to "false" on click', () => {
    let state = true;
    const onClick = () => {
      state = false;
    };

    const wrapper = shallow(<Button onClick={onClick}>Button</Button>);
    expect(state).toBe(true);
    wrapper.simulate('click');
    expect(state).toBe(false);
  });
});
