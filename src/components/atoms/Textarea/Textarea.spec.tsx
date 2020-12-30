import { shallow } from 'enzyme';
import React from 'react';
import Textarea from './Textarea';

describe('Test <Textarea/> component', () => {
  it('should have maxLength indicator', () => {
    const wrapper = shallow(<Textarea defaultValue='value' maxLength={100} />);
    expect(wrapper.find('.rf-textarea__max-length')).toHaveLength(1);
    expect(wrapper.find('.rf-textarea__max-length').text()).toBe('5 / 100');
  });
});
