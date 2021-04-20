import React, {
  ChangeEvent, useEffect, useState
} from 'react';
import { IOption } from '../../../types';
import Select from './Select';
import Info from '../../_icons/info-circle';
import { Button, Tooltip } from '../../../index';
import Story from '../../storybook/Story';
import StoryRow from '../../storybook/StoryRow';
import StoryItem from '../../storybook/StoryItem';
import { useReactiveForm } from 'use-reactive-form';
import {
  array, object, string
} from 'yup';

export default {
  title: 'Form Controls/Select',
  component: Select
};

const list: IOption[] = [];

for (let i = 1; i < 15; i++) {
  if (i % 5 !== 0) {
    list.push({
      value: `${i}`,
      label: `Вариант ${i}`
    });
  } else {
    list.push({
      value: `${i}`,
      label: `Вариант ${i}`,
      disabled: true,
      node: (
        <div style={ {
          display: 'flex',
          alignItems: 'center'
        } }>
          Неактивный вариант
          <Tooltip>
            <Info style={ {
              marginLeft: '8px',
              color: 'var(--warning-500)'
            } }/>
            <div style={ { width: '240px' } }>
              <div>Вам недоступна эта опция. Свяжитесь с администратором для получения доступа.</div>
              <div style={ { marginTop: '8px' } }>
                <Button size='small' buttonType='outlinePrimary'>
                  Связаться
                </Button>
              </div>
            </div>
          </Tooltip>
        </div>
      )
    });
  }
}

export const select = () => {
  const [s, setS] = useState(['']);

  useEffect(() => {
    setS(['']);
  }, [2000]);

  const [s1, setS1] = useState('1');

  useEffect(() => {
    setS1('2');
  }, [2000]);

  const [s3, setS3] = useState('');

  const config = {
    fields: {
      select1: '',
      select2: [],
      select3: '',
      select4: []
    },
    schema: object().shape({
      select1: string().required('Это обязательное поле'),
      select2: array().test({
        test: () => values.select2.length > 0,
        message: 'Это обязательное поле'
      }),
      select3: string().required('Это обязательное поле'),
      select4: array().test({
        test: () => values.select4.length > 0,
        message: 'Это обязательное поле'
      }),
    })
  };
  const { ref, values, validate, update, errors }: any = useReactiveForm(config);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      console.log(values);
    } else {
      console.log(values, errors);
    }
  };

  const [options, setOptions] = useState(list);

  const saveOption = (o: IOption) => {
    setOptions([
      ...options,
      {
        value: o.value,
        label: o.label
      }
    ]);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>, o?: IOption) => {
    console.log('onChange', o);
  };

  const getValue1 = (o: IOption) => {
    console.log('getValue1', o);
  };

  const getValue2 = (o: IOption) => {
    console.log('getValue2', o);
  };

  const onCreateOption1 = (o: IOption) => {
    console.log('onCreateOption1', o);
    update(Object.assign({}, values, { select3: o.value } ));
    list.push(o);
  };

  const onCreateOption2 = (o: IOption) => {
    console.log('onCreateOption2', o);
    update(Object.assign({}, values, { select4: [...values.select4, o.value] } ));
    list.push(o);
  };

  return (
    <Story name='Select' width={ 600 }>
      <StoryItem description='Выбор радио кнопок или чекбоксов из выпадающего списка'>
        <StoryRow>
          <Select options={ list } placeholder='Запрещен ввод' readOnly/>
        </StoryRow>
        <StoryRow>
          <Select name='s1' options={ options } placeholder='Выберите значение' value={ s1 } />
        </StoryRow>
        <StoryRow>
          <Select name='s2' options={ options } placeholder='Выберите несколько значений' multiSelect value={ s } />
        </StoryRow>
        <StoryRow>
          <Select name='s1' options={ options } placeholder='Кастомный выбор' value={ s3 } creatable onCreateOption={saveOption} saveOptionMessage='Хотите создать'/>
        </StoryRow>
        <StoryRow>
          <Select name='s2' options={ options } placeholder='Кастомный мульти выбор' multiSelect creatable value={ s } onCreateOption={saveOption} saveOptionMessage='Хотите создать' />
        </StoryRow>
      </StoryItem>

      <StoryItem
        description='Поведение в форме.'>
        <form ref={ ref } onSubmit={ onSubmit }>
          <div style={ {
            minWidth: '200px',
            marginBottom: '12px'
          } }>
            <Select options={list} name='select1' placeholder='Единичный выбор' defaultValue={values.select1}/>
            { errors.select1?.error && <p style={ { marginTop: '8px' } }>{ errors.select1.error }</p> }
          </div>
          <div style={ {
            minWidth: '200px',
            marginBottom: '12px'
          } }>
            <Select options={list} name='select2' multiSelect placeholder='Множественный выбор' defaultValue={values.select2}/>
            { errors.select2?.error && <p style={ { marginTop: '8px' } }>{ errors.select2.error }</p> }
          </div>

          <div style={ {
            minWidth: '200px',
            marginBottom: '12px'
          } }>
            <Select
              options={list}
              creatable
              name='select3'
              placeholder='Кастомный выбор'
              onChange={onChange}
              onCreateOption={onCreateOption1}
              getValue={getValue1}
              saveOptionMessage='Хотите создать'
              defaultValue={values.select3}/>
          </div>

          <div style={ {
            minWidth: '200px',
            marginBottom: '12px'
          } }>
            <Select
              multiSelect
              creatable
              options={list}
              onChange={onChange}
              onCreateOption={onCreateOption2}
              name='select4'
              placeholder='Кастомный мульти выбор'
              getValue={getValue2}
              saveOptionMessage='Хотите создать'
              defaultValue={values.select4}/>
          </div>
          <div>
            <Button type='submit'>Отправить</Button>
          </div>
        </form>
      </StoryItem>
    </Story>
  );
};
