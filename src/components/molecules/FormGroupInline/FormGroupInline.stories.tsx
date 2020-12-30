import React from 'react';
import FormGroupInline from './FormGroupInline';
import Input from '../../atoms/Input';
import Story from '../../storybook/Story';
import StoryRow from '../../storybook/StoryRow';
import StoryItem from '../../storybook/StoryItem';

export default {
  title: 'Form Controls/FormGroupInline',
  component: FormGroupInline
};

export const formGroupInline = () => {
  return (
    <Story name='FormGroupInline' width={600}>
      <StoryItem description='Группировка элементов формы'>
        <StoryRow>
          <FormGroupInline label='Логин:'>
            <Input name='text' placeholder='Введите текст' />
          </FormGroupInline>
        </StoryRow>

        <StoryRow>
          <FormGroupInline label='Пароль:' errorMessage='Обязательное поле' required={true}>
            <Input name='text' placeholder='Введите текст' className='invalid' />
          </FormGroupInline>
        </StoryRow>
      </StoryItem>
    </Story>
  );
};
