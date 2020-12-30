import { shallow } from 'enzyme';
import React from 'react';
import Chips from './Chips';
import { IChips } from '../../../types';

describe('Test <Chips/> component', () => {
  let items: IChips[] = [
    {
      id: '1',
      name: 'Администратор'
    },
    {
      id: '2',
      name: 'Руководитель'
    },
    {
      id: '3',
      name: 'Разработчик',
      disabled: true
    }
  ];

  it('should have 3 chips', () => {
    const wrapper = shallow(<Chips items={items} />);
    expect(wrapper.find('.rf-chips__item')).toHaveLength(3);
  });

  it('should have all chips disabled', () => {
    const wrapper = shallow(<Chips items={items} disabled />);
    expect(wrapper.find('.rf-chips__item--disabled')).toHaveLength(3);
  });

  it('should have last chip disabled', () => {
    const wrapper = shallow(<Chips items={items} />);
    expect(wrapper.find('.rf-chips__item--disabled')).toHaveLength(1);
    expect(wrapper.find('.rf-chips__item').at(2).hasClass('rf-chips__item--disabled')).toBeTruthy();
  });

  it('should have primary class', () => {
    const wrapper = shallow(<Chips items={items} variant='accent' />);
    expect(wrapper.find('.rf--accent')).toHaveLength(3);
  });

  it('should have "custom" class', () => {
    const wrapper = shallow(<Chips items={items} className='custom' />);
    expect(wrapper.find('.custom')).toHaveLength(3);
  });

  it('should return IChips on click', () => {
    let chip: IChips | undefined = undefined;
    const onClick = (c: IChips) => {
      chip = c;
    };

    const wrapper = shallow(<Chips items={items} onClick={onClick} />);
    expect(chip).toBe(undefined);
    const firstChip = wrapper.find('.rf-chips__item').first();
    firstChip.simulate('click', { preventDefault: () => {} });
    expect(chip === undefined).toBeFalsy();
    // @ts-ignore
    expect(chip.id).toBe('1');
  });

  it('should not have remove button', () => {
    const wrapper = shallow(<Chips items={items} />);
    expect(wrapper.find('.rf-chips__button')).toHaveLength(0);
  });

  it('should remove first on button click', () => {
    let id = '';
    const onClick = (chipId: string) => {
      id = chipId;
      items = items.filter((e: IChips) => e.id !== id);
    };

    const wrapper = shallow(<Chips items={items} onRemove={onClick} />);
    const firstChip = wrapper.find('.rf-chips__button').first();

    firstChip.simulate('click', {
      preventDefault: jest.fn,
      stopPropagation: jest.fn
    });

    expect(id).toBe('1');
  });
});
