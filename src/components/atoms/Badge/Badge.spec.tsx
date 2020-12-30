import React from 'react';
import { shallow } from 'enzyme';
import Badge from './Badge';

describe('', () => {
  it('Should render <Badge /> component with text "Badge" and badgeContent "9"', () => {
    const badge = (
      <Badge badgeContent='9'>
        <span id='badge_1'>Badge</span>
      </Badge>
    );
    const wrapper = shallow(badge);
    expect(wrapper.find('.rf-badge').text()).toBe('9');
    expect(wrapper.find('#badge_1').text()).toBe('Badge');
  });

  it('Should render <Badge /> component with badgeContent "99+"', () => {
    const badge = (
      <Badge badgeContent='999' max={99}>
        Badge
      </Badge>
    );
    const wrapper = shallow(badge);
    expect(wrapper.find('.rf-badge').text()).toBe('99+');
  });

  it('Should have class "rf--info"', () => {
    const badge = <Badge variant='info'>Badge</Badge>;
    const wrapper = shallow(badge);
    expect(wrapper.find('.rf--info')).toHaveLength(1);
  });

  it('Should be empty and have class "rf-badge--dot"', () => {
    const badge = <Badge>Badge</Badge>;
    const wrapper = shallow(badge);
    const item = wrapper.find('.rf-badge--dot');
    expect(item).toHaveLength(1);
    expect(item.text()).toHaveLength(0);
  });
});
