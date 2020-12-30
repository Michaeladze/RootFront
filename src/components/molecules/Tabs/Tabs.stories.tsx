import React from 'react';
import Tabs from './Tabs';
import { ITab } from '../../../types';
import { BrowserRouter } from 'react-router-dom';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';

export default {
  title: 'Tabs',
  component: Tabs
};

export const tabs = () => {
  const tab1 = (
    <div style={{ padding: '20px' }}>
      <ul>
        <li> Заявка 1</li>
        <li> Заявка 2</li>
      </ul>
    </div>
  );

  const tab2 = (
    <div style={{ padding: '20px' }}>
      <ul>
        <li> Запрос 1</li>
        <li> Запрос 2</li>
      </ul>
    </div>
  );

  const tab3 = (
    <div style={{ padding: '20px' }}>
      <ul>
        <li> Вопрос 1</li>
        <li> Вопрос 2</li>
      </ul>
    </div>
  );

  const list: ITab[] = [
    {
      label: 'Заявки',
      tab: tab1
    },
    {
      label: 'Запросы',
      tab: tab2,
      active: true
    },
    {
      label: 'Вопросы и ответы',
      tab: tab3
    },
    {
      label: 'Ситуации',
      disabled: true
    }
  ];

  return (
    <Story
      name='Tabs (Вкладки)'
      description='Переключение между вкладками. Внутри вкладки может быть как компонент, так и роутер.'>
      <StoryItem description='Тип underline (по умолчанию)'>
        <BrowserRouter>
          <Tabs list={list} />
        </BrowserRouter>
      </StoryItem>

      <StoryItem description='Тип buttons'>
        <BrowserRouter>
          <Tabs list={list} type='buttons' />
        </BrowserRouter>
      </StoryItem>
    </Story>
  );
};
