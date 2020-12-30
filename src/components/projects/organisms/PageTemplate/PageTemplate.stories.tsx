import React from 'react';

import PageTemplate from './PageTemplate';
import { BrowserRouter } from 'react-router-dom';
import { IBreadcrumb } from '../../../../types';
import { Tile } from '../../../../index';
import Story from '../../../storybook/Story';
import StoryItem from '../../../storybook/StoryItem';

export default {
  title: 'Projects/PageTemplate',
  component: PageTemplate
};

const breadcrumbs: IBreadcrumb[] = [
  {
    label: 'Главная',
    url: '/home'
  },
  {
    label: 'Изменение графика рабочего времени',
    url: '/request',
    disabled: true
  }
];
export const pageTemplate = () => (
  <Story name='Шаблон страницы' height={500}>
    <StoryItem description='Шаблон основных страниц приложения'>
      <BrowserRouter>
        <div style={{
          height: '220px',
          marginBottom: '30px'
        }}>
          <PageTemplate title='Изменение графика рабочего времени' breadcrumbs={breadcrumbs}>
            <Tile>Children</Tile>
          </PageTemplate>
        </div>
        <div style={{
          height: '220px',
          marginBottom: '30px'
        }}>
          <PageTemplate onlyTitle={true} title='Изменение графика рабочего времени' breadcrumbs={breadcrumbs}>
            <Tile>Children</Tile>
          </PageTemplate>
        </div>
      </BrowserRouter>
    </StoryItem>
  </Story>
);
