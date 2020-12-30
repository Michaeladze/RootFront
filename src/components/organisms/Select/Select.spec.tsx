import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import Select from './Select';
import { IOption } from '../../../types';

describe('Test <Select/> component', () => {
  let list: IOption[] = [];

  beforeEach(() => {
    list = [
      {
        value: '1',
        label: 'Option 1'
      },
      {
        value: '2',
        label: 'Option 2'
      },
      {
        value: '3',
        label: 'Disabled option',
        disabled: true
      }
    ];
  });

  it('Should render Select with "Option 3" disabled', () => {
    const wrapper = mount(<Select options={list} />);
    const radioButtons: ReactWrapper<any, any> = wrapper.find('.rf-radio__input');
    expect(radioButtons.length).toBe(3);
    expect(radioButtons.at(2).prop('disabled')).toBe(true);
  });

  it('Should have defaultSelectName name attribute', () => {
    const wrapper = mount(<Select options={list} />);
    const radioButtons: ReactWrapper<any, any> = wrapper.find('.rf-radio__input');
    expect(radioButtons.at(2).prop('name')).toBe('defaultSelectName');
  });

  it('Should render Select with "Option 1" as value', () => {
    const wrapper = mount(<Select options={list} value={list[0].value} />);
    const input = wrapper.find('.rf-input__field[type="text"]');
    expect(input.prop('value')).toBe(list[0].label);

    const radioButtons: ReactWrapper<any, any> = wrapper.find('.rf-radio__input');
    expect(radioButtons.at(0).prop('checked')).toBe(true);
  });

  it('Should render Select with value=[1, 2]', () => {
    const wrapper = mount(<Select options={list} value={[list[0].value, list[1].value]} placeholder='placeholder' multiSelect />);
    const input = wrapper.find('.rf-input__field[type="text"]');
    expect(input.prop('value')).toBe('');
    expect(input.prop('placeholder')).toBe('placeholder');

    const checkboxes: ReactWrapper<any, any> = wrapper.find('.rf-checkbox__input');
    expect(checkboxes.at(0).prop('checked')).toBe(true);
    expect(checkboxes.at(1).prop('checked')).toBe(true);

    const chips = wrapper.find('.rf-chips__name');
    expect(chips.length).toBe(2);
    expect(chips.at(0).text()).toBe(list[0].label);
    expect(chips.at(1).text()).toBe(list[1].label);
  });

  it('Should open dropdown', () => {
    const wrapper = mount(<Select options={list} />);
    const input = wrapper.find('.rf-input__field[type="text"]');

    expect(wrapper.find('.rf-select__list--show').length).toBe(0);
    input.simulate('click');
    expect(wrapper.find('.rf-select__list--show').length).toBe(1);
  });
});
