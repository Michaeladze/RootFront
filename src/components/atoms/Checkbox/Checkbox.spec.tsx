import { shallow } from 'enzyme';
import React from 'react';
import Checkbox from './Checkbox';

describe('Test <Checkbox/> component', () => {
  it('Should be rendered with text "Label" and value "1"', () => {
    const element = <Checkbox value='1' label='Label' />;
    const wrapper = shallow(element);

    expect(wrapper.find('.rf-checkbox__input').prop('value')).toBe('1');
    expect(wrapper.find('.rf-checkbox__label').text()).toBe('Label');
  });

  it('Should be unchecked on mount', () => {
    const element = <Checkbox value='1' label='Label 1' />;
    const wrapper = shallow(element);

    expect(wrapper.find('.rf-checkbox__input').prop('checked')).toBe(undefined);
  });

  it('Should be disabled', () => {
    const element = <Checkbox value='1' label='Label 1' disabled />;
    const wrapper = shallow(element);

    expect(wrapper.find('.rf-checkbox__input').prop('disabled')).toBe(true);
  });

  it('Should have class "custom-class"', () => {
    const element = <Checkbox value='1' label='Label 1' className='custom-class' />;
    const wrapper = shallow(element);

    expect(wrapper.find('.rf-checkbox').hasClass('custom-class')).toBe(true);
  });

  it('Should be checked after click', () => {
    let checked = false;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      checked = e.target.checked;
    };

    const element = <Checkbox value='1' label='Label 1' onChange={onChange} />;
    const wrapper = shallow(element);

    const input = wrapper.find('.rf-checkbox__input');
    expect(checked).toBe(false);
    input.simulate('change', { target: { checked: true } });
    expect(checked).toBe(true);
  });
});
