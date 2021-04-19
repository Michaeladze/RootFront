import React, { useEffect, useState } from 'react';
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
import CreatableSelect from '../CreateableSelect/CreatableSelect';

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
  const [s, setS] = useState(['1']);

  useEffect(() => {
    setS(['1', '2']);
  }, [2000]);

  const [s1, setS1] = useState('1');

  useEffect(() => {
    setS1('2');
  }, [2000]);

  const config = {
    fields: {
      select1: '',
      select2: [],
      select3: ''
    },
    schema: object().shape({
      select1: string().required('Это обязательное поле'),
      select2: array().test({
        test: () => values.select2.length > 0,
        message: 'Это обязательное поле'
      }),
      select3: string().required('Это обязательное поле')
    })
  };
  const { ref, values, validate, update, errors }: any = useReactiveForm(config);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      console.log(values);
    } else {
      console.log(errors);
    }
  };

  const [options, setOptions] = useState(list);

  const saveOption = (value: string) => {
    setOptions([
      ...options,
      {
        value,
        label: value
      }
    ]);
  };

  return (
    <Story name='Select' width={ 600 }>
      <StoryItem description='Выбор радио кнопок или чекбоксов из выпадающего списка'>
        <StoryRow>
          <Select options={ list } placeholder='Запрещен ввод' readOnly/>
        </StoryRow>
        <StoryRow>
          <Select name='s1' options={ options } placeholder='Выберите значение' value={ s1 } saveOption={saveOption} creatable saveOptionMessage='Хотите создать'/>
        </StoryRow>
        <StoryRow>
          <Select name='s2' options={ options } placeholder='Выберите несколько значений' multiSelect value={ s } saveOption={saveOption} creatable/>
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
            <CreatableSelect
              createOptionPosition='first'
              formatCreateLabel={(s) => `Иное: '${s}'`}
              options={list}
              name='select3'
              placeholder='Кастомный выбор'
              getValue={(v) => update(Object.assign({}, values, { select3: v.value } ))}
              defaultValue={values.select3}/>
          </div>
          <div>
            <Button type='submit'>Отправить</Button>
          </div>
        </form>
      </StoryItem>
    </Story>
  );
};
