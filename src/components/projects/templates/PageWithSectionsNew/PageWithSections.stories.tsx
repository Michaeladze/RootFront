import React, { useEffect, useState } from 'react';

import PageWithSections from './PageWithSections';
import { IPageSection } from '../../../../types/projects.types';
import { ITab } from '../../../../types';
import { BrowserRouter } from 'react-router-dom';
import Button from '../../../atoms/Button';
import { ContentExpander } from '../../../../index';
import Employee from '../../organisms/Employee';
import { usersMocks } from '../../organisms/FindUsers/users.mocks';
import RequestHistory from '../../organisms/RequestHistory';
import { historyMocks } from './history.mocks';

export default {
  title: 'Projects/[New] Page With Sections',
  component: PageWithSections
};

export const pageWithSections = () => {

  const sections: IPageSection[] = [
    {
      id: 'position',
      title: 'Позиция',
      component: <div style={{ height: '300px' }}> <Employee user={usersMocks[usersMocks.length - 1]}/> </div>
    },
    {
      id: 'noname',
      component: <div style={{ height: '100px' }}> Без названия </div>
    },
    {
      id: 'history',
      title: 'История подбора',
      component: <RequestHistory requestPath={historyMocks} initiator={usersMocks[usersMocks.length - 1]}/>
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

  const user: any = { fullName: 'Ричард Брэндмауер' };

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000);
  }, []);

  const actionMenu = (
    <>
      <Button size='big'> Согласовать </Button>
    </>
  );

  return (
    <BrowserRouter>
      <div style={{
        padding: '0 20px',
        backgroundColor: 'var(--base-150)'
      }}>
        <PageWithSections sections={sections} actionMenu={actionMenu} preloader={!loaded} title='Изменение графика рабочего времени' backUrl='/'/>
      </div>
    </BrowserRouter>
  );
};
