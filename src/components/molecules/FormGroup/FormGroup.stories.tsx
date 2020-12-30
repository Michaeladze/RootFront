import React from 'react';
import FormGroup from './FormGroup';
import Input from '../../atoms/Input/Input';
import Story from '../../storybook/Story';
import StoryRow from '../../storybook/StoryRow';
import StoryItem from '../../storybook/StoryItem';

export default {
  title: 'Form Controls/FormGroup',
  component: FormGroup
};

export const formGroup = () => (
  <Story name='FormGroup' width={600}>
    <StoryItem description='Группировка элементов формы'>
      <StoryRow>
        <FormGroup label='Дефолтное состояние с контентом'>
          <Input name='text' placeholder='Введите текст' />
        </FormGroup>
      </StoryRow>

      <StoryRow>
        <FormGroup label='Ошибка в поле ввода' errorMessage='Обязательное поле' required={true}>
          <Input name='text' placeholder='Введите текст' className='invalid' />
        </FormGroup>
      </StoryRow>
    </StoryItem>
  </Story>
);
