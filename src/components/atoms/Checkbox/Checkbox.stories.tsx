import React from 'react';
import { IOption, Variant } from '../../../types';
import Checkbox from './Checkbox';
import { variants } from '../../../utils/helpers';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import StoryRow from '../../storybook/StoryRow';

export default {
  title: 'Form Controls/Checkbox',
  component: Checkbox
};

const checkboxes: IOption[] = [
  {
    value: '1',
    label: 'Вариант 1'
  },
  {
    value: '2',
    label: 'Вариант 2'
  },
  {
    value: '3',
    label: 'Вариант 3',
    disabled: true
  },
  {
    value: '4',
    label: 'Неактивный вариант',
    disabled: true
  }
];

export const checkbox = () => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => console.log(e.target.checked);

  const variantsJSX = variants.map((variant: Variant) => (
    <StoryRow key={variant}>
      <Checkbox name='checkbox' value={variant} label={variant} variant={variant} defaultChecked />
    </StoryRow>
  ));

  const checkboxesJSX = checkboxes.map((item: IOption) => (
    <StoryRow key={item.value}>
      <Checkbox
        name='checkbox'
        value={item.value}
        label={item.label}
        defaultChecked={['1', '2', '3'].includes(item.value)}
        onChange={onChange}
        disabled={item.disabled}
      />
    </StoryRow>
  ));

  return (
    <Story name='Checkbox'>
      <StoryItem description='Состояния чекбокса'>{checkboxesJSX}</StoryItem>
      <StoryItem description='Варианты цветового оформления'>{variantsJSX}</StoryItem>
    </Story>
  );
};
