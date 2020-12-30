import { shallow } from 'enzyme';
import React from 'react';
import ContentExpander from './ContentExpander';

describe('Test <ContentExpander/> component', () => {
  it('should have title "Title"', () => {
    const wrapper = shallow(<ContentExpander title='Title'>Message</ContentExpander>);
    expect(wrapper.find('.expander__title-text').text()).toBe('Title');
  });

  it('should have content "Message"', () => {
    const wrapper = shallow(<ContentExpander title='Title'>Message</ContentExpander>);
    expect(wrapper.find('.expander__content').text()).toBe('Message');
  });

  it('should be expanded', () => {
    const wrapper = shallow(<ContentExpander title='Title' defaultValue={true}>
        Message
    </ContentExpander>);
    const icon = wrapper.find('.expander__icon');
    const content = wrapper.find('.expander__content');

    expect(icon.hasClass('expander__icon--rotate')).toBeTruthy();
    expect(content.hasClass('expander__content--active')).toBeTruthy();
  });

  it('should not be expanded', () => {
    const wrapper = shallow(<ContentExpander title='Title'>Message</ContentExpander>);
    const icon = wrapper.find('.expander__icon');
    const content = wrapper.find('.expander__content');

    expect(icon.hasClass('expander__icon--rotate')).toBeFalsy();
    expect(content.hasClass('expander__content--active')).toBeFalsy();
  });

  it('should expand on click', () => {
    const wrapper = shallow(<ContentExpander title='Title'>Message</ContentExpander>);
    const title = wrapper.find('.expander__title');

    expect(wrapper.find('.expander__icon').hasClass('expander__icon--rotate')).toBeFalsy();
    expect(wrapper.find('.expander__content').hasClass('expander__content--active')).toBeFalsy();
    title.simulate('click');
    expect(wrapper.find('.expander__icon').hasClass('expander__icon--rotate')).toBeTruthy();
    expect(wrapper.find('.expander__content').hasClass('expander__content--active')).toBeTruthy();
  });

  it('should shrink on click', () => {
    const wrapper = shallow(<ContentExpander title='Title' defaultValue={true}>
        Message
    </ContentExpander>);
    const title = wrapper.find('.expander__title');

    expect(wrapper.find('.expander__icon').hasClass('expander__icon--rotate')).toBeTruthy();
    expect(wrapper.find('.expander__content').hasClass('expander__content--active')).toBeTruthy();
    title.simulate('click');
    expect(wrapper.find('.expander__icon').hasClass('expander__icon--rotate')).toBeFalsy();
    expect(wrapper.find('.expander__content').hasClass('expander__content--active')).toBeFalsy();
  });
});
