import React from 'react';
import Switch from './Switch';
import { variants } from '../../../utils/helpers';
import { Variant } from '../../../types';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import StoryRow from '../../storybook/StoryRow';

export default {
  title: 'Switch',
  component: Switch
};

export const switcher = () => {
  const onChange = (flag: boolean) => {
    console.log(`Новое состояние: ${flag}`);
  };

  const switchVariantsJSX = variants.map((variant: Variant) => (
    <StoryRow key={variant}>
      <Switch variant={variant} state={true} label={variant} />
    </StoryRow>
  ));

  return (
    <Story name='Switch (Переключатель)' description='Переключает состояние какой-нибудь сущности'>
      <StoryItem description='Состояния переключателя'>
        <StoryRow>
          <Switch onChange={onChange} />
        </StoryRow>
        <StoryRow>
          <Switch label='С текстом' onChange={onChange} />
        </StoryRow>
        <StoryRow>
          <Switch label='Сразу включен' state={true} onChange={onChange} />
        </StoryRow>
        <StoryRow>
          <Switch label='Неактивен и включен' state={true} disable={true} onChange={onChange} />
        </StoryRow>
        <StoryRow>
          <Switch label='Неактивен и выключен' disable={true} onChange={onChange} />
        </StoryRow>
      </StoryItem>
      <StoryItem description='Варианты цветового оформления'>{switchVariantsJSX}</StoryItem>
    </Story>
  );
};
