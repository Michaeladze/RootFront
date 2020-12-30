import { mount } from 'enzyme';
import React from 'react';
import Tabs from './Tabs';
import { ITab } from '../../../types';
import { BrowserRouter } from 'react-router-dom';

describe('Test <Tabs/> component', () => {
  const list: ITab[] = [
    {
      label: 'Заявки',
      tab: <div className='first-content'>Tab1</div>
    },
    {
      label: 'Запросы',
      tab: <div className='active-tab'>Tab2</div>,
      active: true
    },
    {
      label: 'Ситуации',
      disabled: true
    }
  ];

  it('should have 3 Tabs', () => {
    const wrapper = mount(<BrowserRouter>
      <Tabs list={list} />
    </BrowserRouter>);
    expect(wrapper.find('.rf-tabs__link')).toHaveLength(3);
  });

  it('should have active tab at index 1', () => {
    const wrapper = mount(<BrowserRouter>
      <Tabs list={list} />
    </BrowserRouter>);
    const secondTab = wrapper.find('.rf-tabs__link').at(1);
    const content = wrapper.find('.rf-tabs__content');
    const button = secondTab.find('.rf-tabs__button');
    expect(button.at(0).hasClass('rf-tabs__button--active')).toBeTruthy();
    expect(content.find('.active-tab').text()).toBe('Tab2');
  });

  it('should have last tab disabled', () => {
    const wrapper = mount(<BrowserRouter>
      <Tabs list={list} />
    </BrowserRouter>);
    const lastTab = wrapper.find('.rf-tabs__link').at(2);
    expect(lastTab.find('button').prop('disabled')).toBeTruthy();
  });

  it('should change active tab to 1st on click', () => {
    const wrapper = mount(<BrowserRouter>
      <Tabs list={list} />
    </BrowserRouter>);
    const firstTabButton = wrapper.find('.rf-tabs__link').at(0).find('button');
    firstTabButton.simulate('click');
    expect(wrapper.find('.rf-tabs__link').at(0).find('button')
      .hasClass('rf-tabs__button--active')).toBeTruthy();
    expect(wrapper.find('.first-content').text()).toBe('Tab1');
  });
});
