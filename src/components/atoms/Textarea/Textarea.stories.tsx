import React from 'react';
import Textarea from './Textarea';
import Story from '../../storybook/Story';
import StoryRow from '../../storybook/StoryRow';
import StoryItem from '../../storybook/StoryItem';

export default {
  title: 'Form Controls/Textarea',
  component: Textarea
};

const data = [
  {
    id: 1,
    name: 'plane',
    placeholder: 'Введите текст',
    className: ''
  },
  {
    id: 2,
    name: 'plane',
    placeholder: 'Ошибка в поле ввода',
    className: 'invalid'
  },
  {
    id: 3,
    name: 'disabled',
    placeholder: 'Неактивное поле',
    className: 'disabled',
    disabled: true
  }
];

export const textArea = () => {
  const getValue = (s: string) => {
    console.log(s);
  };

  const listJSX = data.map((item) => (
    <StoryRow key={item.id}>
      <Textarea
        name={item.name}
        placeholder={item.placeholder}
        className={item.className}
        disabled={item.disabled}
        autoResize={true}
        maxLength={255}
        getValue={getValue}
      />
    </StoryRow>
  ));

  return (
    <Story name='Textarea' width={600}>
      <StoryItem description='Текстовое поле'>{listJSX}</StoryItem>
      <StoryItem description='Текстовое поле'>
        <Textarea disabled defaultValue='lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem s'/>
      </StoryItem>
    </Story>
  );
};
