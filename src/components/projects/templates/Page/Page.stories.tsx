import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Page } from '../../../../index';
import { ITab } from '../../../../types';

export default {
  title: 'Projects/Page',
  component: Page
};

export const page = () => {

  const navigation: ITab[] = [
    {
      url: '/page1',
      label: 'Page 1'
    },
    {
      url: '/page2',
      label: 'Page 2'
    }
  ];

  const user: any = { fullName: 'Ричард Брэндмауер' };

  return (
    <BrowserRouter>
      <Page backUrl='/' title='Изменение графика рабочего времени' user={user} navigation={navigation} />
    </BrowserRouter>
  );
};
