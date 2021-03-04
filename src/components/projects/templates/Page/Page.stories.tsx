import React, {
  ReactNode, useEffect, useState
} from 'react';

import { BrowserRouter } from 'react-router-dom';
import { ContentExpander, Page } from '../../../../index';
import PageWithSections from '../PageWithSections';
import ActionMenu from '../ActionMenu';
import { IPageSection } from '../../../../types/projects.types';
import { ITab } from '../../../../types';

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
      component: <ContentExpander title='Expand'>
        <div style={{ height: '300px' }}>222</div>
        <div style={{ height: '300px' }}>222</div>
        <div style={{ height: '300px' }}>222</div>
        <div style={{ height: '300px' }}>222</div>
      </ContentExpander>
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

  const [s, setS] = useState<ReactNode>(null);

  useEffect(() => {
    setTimeout(() => {
      setS(<ActionMenu/>);
    }, 2000);

    setTimeout(() => {
      setS(null);
    }, 3000);
  }, []);

  return (
    <BrowserRouter>
      <Page backUrl='/' title='Изменение графика рабочего времени' navigation={navigation} >
        <PageWithSections sections={sections} actionMenu={s}/>
      </Page>
    </BrowserRouter>
  );
};
