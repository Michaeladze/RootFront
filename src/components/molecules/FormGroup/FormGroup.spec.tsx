import { shallow } from 'enzyme';
import React from 'react';
import FormGroup from './FormGroup';

describe('Test <FormGroup/> component', () => {
  it('should have label "Label"', () => {
    const wrapper = shallow(<FormGroup label='Label'>Content</FormGroup>);
    expect(wrapper.find('.rf-form-group__label').text()).toBe('Label');
  });

  it('should have content "Content"', () => {
    const wrapper = shallow(<FormGroup label='Label'>
      <p className='content'>Content</p>
    </FormGroup>);
    expect(wrapper.find('.rf-form-group__inner').childAt(1).hasClass('content')).toBeTruthy();
  });

  it('should have "*" when required', () => {
    const wrapper = shallow(<FormGroup label='Label' required>
        Content
    </FormGroup>);
    expect(wrapper.find('.rf-form-group__required')).toHaveLength(1);
  });

  it('should have error message "Error"', () => {
    const wrapper = shallow(<FormGroup label='Label' errorMessage='Error'>
        Content
    </FormGroup>);
    expect(wrapper.find('.rf-form-group__message')).toHaveLength(1);
    expect(wrapper.find('.rf-form-group__message').text()).toBe('Error');
  });
});
