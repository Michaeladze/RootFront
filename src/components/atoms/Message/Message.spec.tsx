import { shallow } from 'enzyme';
import React from 'react';
import Message from './Message';

describe('Test <Message/> component', () => {
  it('should have "Message" content', () => {
    const wrapper = shallow(<Message>Message</Message>);
    expect(wrapper.find('.rf-message__message').text()).toBe('Message');
  });

  it('should have "info" class', () => {
    const wrapper = shallow(<Message>Message</Message>);
    expect(wrapper.find('.rf-message').hasClass('rf--info')).toBeTruthy();
  });

  it('should have "success" class', () => {
    const wrapper = shallow(<Message variant='success'>Message</Message>);
    expect(wrapper.find('.rf-message').hasClass('rf--success')).toBeTruthy();
  });
});
