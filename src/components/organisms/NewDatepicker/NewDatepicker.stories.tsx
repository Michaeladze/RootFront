import React, { useState } from 'react';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';
import NewDatepicker from './NewDatepicker';
import { useReactiveForm } from 'use-reactive-form';
import { Button, Checkbox } from '../../../index';
import { IDateVariants } from '../../../types/projects.types';
import { object, string } from 'yup';

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

  const [disabled, setDisabled] = useState(false);

  const config = {
    fields: {
      fromDate: '',
      toDate: ''
    },
    schema: object().shape({
      fromDate: string().test({
        test: (value: any) => {
          return !value.includes('_') && value.length > 0;
        },
        message: 'Выберите дату начала'
      }),
      toDate: disabled ?
        string()
          .notRequired() :
        string().test({
          test: (value: any) => {
            return !value.includes('_') && value.length > 0;
          },
          message: 'Выберите дату окончания'
        })
    })
  };
  const { ref, values, validate, errors, update } = useReactiveForm(config);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      console.log({
        ...values,
        toDate: disabled ? -1 : values.toDate
      });
    } else {
      console.log(errors);
    }
  };

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
              max={new Date().getTime() + 1000 * 3600 * 24 * 370}
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
        {errors.fromDate?.error && <p style={{ marginTop: '8px' }}>{errors.fromDate.error}</p>}
        {errors.toDate?.error && <p style={{ marginTop: '8px' }}>{errors.toDate.error}</p>}
      </StoryItem>

      <StoryItem description='Выбор диапазона. Задается пропсом range. На вход принимает только строку.'>
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
