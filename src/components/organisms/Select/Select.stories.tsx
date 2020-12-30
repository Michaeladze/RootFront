import React, { useEffect, useState } from 'react';
import { IOption } from '../../../types';
import Select from './Select';
import Info from '../../_icons/info-circle';
import { Button, Tooltip } from '../../../index';
import Story from '../../storybook/Story';
import StoryRow from '../../storybook/StoryRow';
import StoryItem from '../../storybook/StoryItem';

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
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          Неактивный вариант
          <Tooltip>
            <Info style={{
              marginLeft: '8px',
              color: 'var(--warning-500)'
            }} />
            <div style={{ width: '240px' }}>
              <div>Вам недоступна эта опция. Свяжитесь с администратором для получения доступа.</div>
              <div style={{ marginTop: '8px' }}>
                <Button size='tiny' buttonType='outlinePrimary'>
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

  return (
    <Story name='Select' width={600}>
      <StoryItem description='Выбор радио кнопок или чекбоксов из выпадающего списка'>
        <StoryRow>
          <Select options={list} placeholder='Запрещен ввод' readOnly inputType='outline' />
        </StoryRow>
        <StoryRow>
          <Select name='s1' options={list} placeholder='Выберите значение' value={s1} />
        </StoryRow>
        <StoryRow>
          <Select name='s2' options={list} placeholder='Выберите несколько значений' multiSelect value={s} />
        </StoryRow>
      </StoryItem>
    </Story>
  );
};
