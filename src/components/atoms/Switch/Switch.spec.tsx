import { shallow } from 'enzyme';
import Switch from './Switch';
import React from 'react';

describe('Test <Switch/> component', () => {
  it('should render with label "Label"', () => {
    const wrapper = shallow(<Switch label='Label' />);
    expect(wrapper.find('.rf-switch__label').text()).toBe('Label');
  });

  it('should be switched off', () => {
    const wrapper = shallow(<Switch label='Label' />);
    expect(wrapper.find('.rf-switch__toggle').hasClass('on')).toBeFalsy();
  });

  it('should be switched on', () => {
    const wrapper = shallow(<Switch label='Label' state={true} />);
    expect(wrapper.find('.rf-switch__toggle').hasClass('on')).toBeTruthy();
  });

  it('should be disabled', () => {
    const wrapper = shallow(<Switch label='Label' disable={true} />);
    expect(wrapper.find('.rf-switch--disable')).toHaveLength(1);
  });

  it('should have no label', () => {
    const wrapper = shallow(<Switch />);
    expect(wrapper.find('.rf-switch__label')).toHaveLength(0);
  });

  it('should have "on" class after click', () => {
    const wrapper = shallow(<Switch />);
    const component = wrapper.find('.rf-switch');
    expect(wrapper.find('.rf-switch__toggle').hasClass('on')).toBeFalsy();
    component.simulate('click');
    expect(wrapper.find('.rf-switch__toggle').hasClass('on')).toBeTruthy();
  });
});
