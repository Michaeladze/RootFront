import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Page } from '../../../../index';
import PageWithSections from '../PageWithSections';
import ActionMenu from '../ActionMenu';
import { IPageSection } from '../../../../types/projects.types';
import { ITab } from '../../../../types';
import StickyContainer from '../StickyContainer';

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
      component: <div style={{ height: '300px' }}>222</div>
    }
  ];

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

  const actionMenu = <ActionMenu type='default'/>;

  return (
    <BrowserRouter>
      <Page backUrl='/' title='Изменение графика рабочего времени' navigation={navigation} actionMenu={actionMenu} >
        <StickyContainer top={242}/>
        <PageWithSections sections={sections}/>
      </Page>
    </BrowserRouter>
  );
};
