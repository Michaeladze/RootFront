import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Page, Tile } from '../../../../index';
import Story from '../../../storybook/Story';
import StoryItem from '../../../storybook/StoryItem';

export default {
  title: 'Projects/Page',
  component: Page
};

export const page = () => (
  <Story name='Шаблон страницы'>
    <StoryItem description='Шаблон основных страниц приложения'>
      <BrowserRouter>
        <Page backUrl='/' title='Изменение графика рабочего времени'>
          <Tile>Children</Tile>
        </Page>
      </BrowserRouter>
    </StoryItem>
  </Story>
);
