import React from 'react';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import NewDatepicker from './NewDatepicker';
import { useReactiveForm } from 'use-reactive-form';
import { Button } from '../../../index';

export default {
  title: 'Form Controls/NewDatepicker',
  component: NewDatepicker
};

export const newDatepicker = () => {

  const getValue = (value: string) => {
    console.log('NewDatepicker: ', value);
  };

  const config = { fields: { date: '' } };
  const { ref, values } = useReactiveForm(config);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <Story name='Datepicker' width={600}
      description='Календарь с выбором даты. В defaultValue можно передать строку, число Date.now() или объект new Date().'>

      <StoryItem description='Выбор даты с вводом. Чтобы запретить ввод, используйте пропс readOnly.'>
        <div style={{ width: '200px' }}>
          <NewDatepicker getValue={getValue}/>
        </div>
      </StoryItem>

      <StoryItem description='Выбор даты с ограничениями. Ограничения задаются пропсами min и max типа Date.'>
        <div style={{ width: '200px' }}>
          <NewDatepicker min={new Date()} max={new Date(2021, 5, 10)} />
        </div>
      </StoryItem>

      <StoryItem description='Поведение в форме'>
        <div style={{ width: '400px' }}>
          <form ref={ref} onSubmit={onSubmit} style={{ display: 'flex' }}>
            <NewDatepicker name='date' />
            <div style={{ marginLeft: '24px' }}>
              <Button type='submit'>Отправить</Button>
            </div>
          </form>
        </div>
      </StoryItem>
    </Story>
  );
};
