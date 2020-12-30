import React from 'react';
import Breadcrumbs from './Breadcrumbs';
import { BrowserRouter } from 'react-router-dom';
import { IBreadcrumb } from '../../../types';
import Story from '../../storybook/Story';
import StoryItem from '../../storybook/StoryItem';

export default {
  title: 'Breadcrumbs',
  component: Breadcrumbs
};

export const breadcrumbs = () => {
  const breadcrumbs: IBreadcrumb[] = [
    {
      label: 'Заявки',
      url: '/home'
    },
    {
      label: 'Каталог',
      url: '/request',
      disabled: false
    },
    {
      label: 'Изменение графика рабочего времени',
      url: '/request',
      disabled: true
    }
  ];

  return (
    <Story name='Breadcrumbs (Хлебные крошки)'>
      <BrowserRouter>
        <StoryItem description='Отображение пути в системе до текущей страницы'>
          <Breadcrumbs list={breadcrumbs} />
        </StoryItem>
      </BrowserRouter>
    </Story>
  );
};
