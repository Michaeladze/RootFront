import { shallow } from 'enzyme';
import React from 'react';
import Tile from './Tile';

describe('Test <Tile/> component', () => {
  it('should have content with text "Content"', () => {
    const wrapper = shallow(<Tile>
      <p className='content'>Content</p>
    </Tile>);
    expect(wrapper.find('.content')).toHaveLength(1);
    expect(wrapper.find('.content').text()).toBe('Content');
  });

  it('should have class "custom-class"', () => {
    const wrapper = shallow(<Tile className='custom-class'>
      <p className='content'>Content</p>
    </Tile>);
    expect(wrapper.find('.rf-tile').hasClass('custom-class')).toBeTruthy();
  });
});
