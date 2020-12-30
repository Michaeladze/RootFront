import { shallow } from 'enzyme';
import React from 'react';
import Input from './Input';

describe('Test <Input/> component', () => {
  it('should have clear button', () => {
    const wrapper = shallow(<Input onClear={jest.fn()} defaultValue='value' />);
    expect(wrapper.find('.rf-input__action-clear')).toHaveLength(1);
  });

  it('should have search button', () => {
    const wrapper = shallow(<Input search={true} />);
    expect(wrapper.find('.rf-input__action-search')).toHaveLength(1);
  });
});
