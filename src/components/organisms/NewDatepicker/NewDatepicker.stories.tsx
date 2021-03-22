import React, { useState } from 'react';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import NewDatepicker from './NewDatepicker';
import { useReactiveForm } from 'use-reactive-form';
import {
  Button, Checkbox, Message
} from '../../../index';
import { IDateVariants } from '../../../types/projects.types';

export default {
  title: 'Form Controls/NewDatepicker',
  component: NewDatepicker
};

export const newDatepicker = () => {

  const onChange = (value: IDateVariants) => {
    console.log('NewDatepicker: ', value);
  };

  const rangeConfig = { fields: { rangeDate: '' } };
  const rangeForm = useReactiveForm(rangeConfig);
  const onRangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(rangeForm.values);
  };

  // --------------------------------------------------------------------------------

  const config = {
    fields: {
      fromDate: '',
      toDate: ''
    }
  };
  const { ref, values, update } = useReactiveForm(config);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      ...values,
      toDate: disabled ? -1 : values.toDate
    });
  };

  const [disabled, setDisabled] = useState(false);

  const onDateChange = (date: IDateVariants, name?: string) => {
    if (date && name) {
      update({
        ...values,
        [name]: date.value
      });
    }
  };

  // --------------------------------------------------------------------------------

  return (
    <Story name='Datepicker' width={600} height={1200}
      description='Календарь с выбором даты. В defaultValue можно передать строку, число Date.now() или объект new Date().'>

      <StoryItem description='Выбор даты с вводом. Для запрещения ввода используется пропс readOnly.'>
        <div style={{ width: '200px' }}>
          <NewDatepicker
            onChange={onChange}/>
        </div>
      </StoryItem>

      <StoryItem description='Выбор даты с ограничениями. Ограничения задаются пропсами min и max типа Date. Если есть ограничение min и не задано defaultValue, то значением становится min.'>
        <div style={{ width: '200px' }}>
          <NewDatepicker min={new Date(2021, 2, 5)} max={new Date(2021, 2, 15)} />
        </div>
      </StoryItem>

      <StoryItem description='Поведение в форме. Нужно помнить, что в input.value лежит строка, поэтому если выставлять min и max относительно значения в форме, то сначала нужно распарсить строку.'>
        <form ref={ref} onSubmit={onSubmit} style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <div style={{ minWidth: '200px' }}>
            <NewDatepicker
              name='fromDate'
              defaultValue={values.fromDate}
              min={new Date()}
              max={new Date().getTime() + 1000 * 3600 * 24 * 30}
              onChange={onDateChange} />
          </div>
          <div style={{
            minWidth: '200px',
            marginLeft: '16px'
          }}>
            <NewDatepicker
              name='toDate'
              disabled={disabled}
              min={values.fromDate ? disabled ? '' : values.fromDate : undefined}
              defaultValue={disabled ? '' : values.toDate}
              onChange={onDateChange} />
          </div>
          <div style={{ marginLeft: '16px' }}>
            <Checkbox label='Бессрочно'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisabled(e.target.checked)}/>
          </div>
          <div style={{ marginLeft: '24px' }}>
            <Button type='submit'>Отправить</Button>
          </div>
        </form>
      </StoryItem>

      <StoryItem description='Выбор диапазона. Задается пропсом range'>
        <Message variant='danger'>В разработке</Message>
        <form ref={rangeForm.ref} onSubmit={onRangeSubmit} style={{
          display: 'flex',
          marginTop: '24px'
        }}>
          <div style={{ width: '240px' }}>
            <NewDatepicker name='rangeDate' range min={Date.now()} max={Date.now() + 1000 * 3600 * 24 * 10} onChange={onChange} />
          </div>
          <div style={{ marginLeft: '24px' }}>
            <Button type='submit'>Отправить</Button>
          </div>
        </form>
      </StoryItem>
    </Story>
  );
};
