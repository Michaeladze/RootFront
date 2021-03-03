import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Page } from '../../../../index';
import { IPageSection } from './Page';

export default {
  title: 'Projects/Page',
  component: Page
};

export const page = () => {

  const sections: IPageSection[] = [
    {
      id: 'position',
      title: 'Позиция',
      component: <div style={{ height: '300px' }}> Позиция </div>
    },
    {
      id: 'type',
      title: 'Тип подбора',
      component: <div style={{ height: '300px' }}> Тип подбора </div>
    },
    {
      id: 'org',
      title: 'Организационные данные',
      component: <div style={{ height: '300px' }}> Организационные данные </div>
    },
    {
      id: 'test1',
      title: 'Раздел 1',
      component: <div style={{ height: '300px' }}> Раздел 1 </div>
    },
    {
      id: 'test2',
      title: 'Раздел 2',
      component: <div style={{ height: '300px' }}> Раздел 1 </div>
    }
  ];

  return (
    <BrowserRouter>
      <Page backUrl='/' title='Изменение графика рабочего времени' sections={sections}/>
    </BrowserRouter>
  );
};
