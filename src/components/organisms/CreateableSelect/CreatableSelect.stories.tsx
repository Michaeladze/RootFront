import React from 'react';
import { ICustomOption, IOption } from '../../../types';
import Info from '../../_icons/info-circle';
import { Button, Tooltip } from '../../../index';
import Story from '../../storybook/Story';
import StoryRow from '../../storybook/StoryRow';
import StoryItem from '../../storybook/StoryItem';
import { useReactiveForm } from 'use-reactive-form';
import { object, string } from 'yup';
import CreatableSelect from '../CreateableSelect/CreatableSelect';

export default {
  title: 'Form Controls/CreatableSelect',
  component: CreatableSelect
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

export const creatableSelect = () => {
  const config = {
    fields: { select1: '' },
    schema: object().shape({ select1: string().required('Это обязательное поле'), })
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, v?: IOption) => {
    console.log('onChange', v);
  };

  const onCreateOption = (option: ICustomOption) => {
    console.log('onCreateOption', option);
  };

  return (
    <Story name='CreatableSelect' width={ 600 }>
      <StoryItem description='При вводе в инпут есть возможность выбрать новую опцию'>
        <StoryRow>
          <CreatableSelect options={ list } placeholder='Можно создать кастомную опцию' formatCreateLabel={(s) => `Это кастомная опция: '${s}'`}/>
        </StoryRow>
      </StoryItem>

      <StoryItem
        description='Поведение в форме.'>
        <form ref={ ref } onSubmit={ onSubmit }>
          <div style={ {
            minWidth: '200px',
            marginBottom: '12px'
          } }>
            <CreatableSelect
              createOptionPosition='first'
              formatCreateLabel={(s) => `Иное: '${s}'`}
              options={list}
              name='select1'
              placeholder='Кастомный выбор'
              onChange={onChange}
              onCreateOption={onCreateOption}
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
