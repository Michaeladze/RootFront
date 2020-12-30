import React from 'react';
import Chips from './Chips';
import { IChips, Variant } from '../../../types';
import { variants } from '../../../utils/helpers';
import Story from '../../storybook/Story';
import StoryRow from '../../storybook/StoryRow';
import StoryItem from '../../storybook/StoryItem';

export default {
  title: 'Chips',
  component: Chips
};

export const chips = () => {
  const items: IChips[] = [
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

  const chips = variants.map((variant: Variant) => (
    <StoryRow key={variant}>
      <Chips items={items} variant={variant} onRemove={(id: string) => console.log(`Remove item with id=${id}`)} />
    </StoryRow>
  ));

  return (
    <Story
      name='Chips (Чипсы или Теги)'
      description='Теги нужны для перечисление свойств или атрибутов какой-либо сущности'>
      <StoryItem description='Состояния тегов'>
        <StoryRow>
          <Chips items={items} />
        </StoryRow>
      </StoryItem>

      <StoryItem description='Цветовое оформление тегов'>{chips}</StoryItem>
    </Story>
  );
};
