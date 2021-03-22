import React, { useState } from 'react';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import NewDatepicker from './NewDatepicker';
import { useReactiveForm } from 'use-reactive-form';
import { Button, Checkbox } from '../../../index';
import { IDateVariants } from '../../../types/projects.types';

export default {
  title: 'Form Controls/NewDatepicker',
  component: NewDatepicker
};

export const newDatepicker = () => {

  const onChange = (value: IDateVariants) => {
    console.log('NewDatepicker: ', value);
  };

  const config = { fields: { date: '' } };
  const { ref, values } = useReactiveForm(config);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(values);
  };

  const rangeConfig = { fields: { rangeDate: '' } };
  const rangeForm = useReactiveForm(rangeConfig);
  const onRangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(rangeForm.values);
  };

  const [disabled, setDisabled] = useState(false);

  return (
    <Story name='Datepicker' width={600} height={1200}
      description='Календарь с выбором даты. В defaultValue можно передать строку, число Date.now() или объект new Date().'>

      <StoryItem description='Выбор даты с вводом. Для запрещения ввода используется пропс readOnly.'>
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{ width: '200px' }}>
            <NewDatepicker
              onChange={onChange}
              disabled={disabled}
              defaultValue={disabled ? undefined : '28.03.2021'}
              min={disabled ? undefined : new Date()}/>
          </div>
          <div style={{ marginLeft: '16px' }}>
            <Checkbox label='Бессрочно'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisabled(e.target.checked)}/>
          </div>
        </div>
      </StoryItem>

      <StoryItem description='Выбор даты с ограничениями. Ограничения задаются пропсами min и max типа Date. Если есть ограничение min и не задано defaultValue, то значением становится min.'>
        <div style={{ width: '200px' }}>
          <NewDatepicker min={new Date(2021, 2, 5)} max={new Date(2021, 2, 15)} />
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

      <StoryItem description='Выбор диапазона. Задается пропсом range'>
        <form ref={rangeForm.ref} onSubmit={onRangeSubmit} style={{ display: 'flex' }}>
          <div style={{ width: '240px' }}>
            <NewDatepicker name='rangeDate' range onChange={onChange} />
          </div>
          <div style={{ marginLeft: '24px' }}>
            <Button type='submit'>Отправить</Button>
          </div>
        </form>
      </StoryItem>
    </Story>
  );
};
