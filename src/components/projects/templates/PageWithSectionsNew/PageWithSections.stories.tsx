import React, { useEffect, useState } from 'react';

import PageWithSections from './PageWithSections';
import { IPageSection } from '../../../../types/projects.types';
import { ITab } from '../../../../types';
import { BrowserRouter } from 'react-router-dom';
import Button from '../../../atoms/Button';
import { ContentExpander, RequestHistory } from '../../../../index';

export default {
  title: 'Projects/[New] Page With Sections',
  component: PageWithSections
};

export const pageWithSections = () => {

  const sections: IPageSection[] = [
    // {
    //   id: 'position',
    //   title: 'Позиция',
    //   component: <div style={{ height: '300px' }}> <Employee user={usersMocks[usersMocks.length - 1]}/> </div>
    // },
    // {
    //   id: 'noname',
    //   component: <div style={{ height: '100px' }}> Без названия </div>
    // },
    // {
    //   id: 'history',
    //   title: 'История подбора',
    //   component: <RequestHistory requestPath={historyMocks} initiator={usersMocks[usersMocks.length - 1]}/>
    // },
    // {
    //   id: 'org',
    //   title: 'Организационные данные',
    //   component: <div style={{ height: '300px' }}> Организационные данные </div>
    // },
    // {
    //   id: 'test1',
    //   title: 'Раздел 1',
    //   component: <div style={{ height: '300px' }}> Раздел 1 </div>
    // },
    {
      id: 'test2',
      title: 'Раздел 2',
      component: <ContentExpander title='Expand 1'>
        <div style={{ height: '300px' }}>222</div>
        <div style={{ height: '300px' }}>222</div>
        <div style={{ height: '300px' }}>222</div>
        <div style={{ height: '300px' }}>222</div>
      </ContentExpander>
    },
    {
      id: 'test22',
      title: 'Раздел 22',
      component: <RequestHistory requestPath={[
        {
        /** Сфера деятельности*/
          actArea: '',
          /** Ид. пути выполнения*/
          pathId: 'a',
          /** Шаг маршрута*/
          stepId: 'a',
          /** Тип шаг (ид)*/
          activityId: 'a',
          /** Тип шаг (текст)*/
          activityText: 'a',
          /** Агент (ид)*/
          agent: 'a',
          /** Агент (текст)*/
          agentName: 'a',
          /** Фактический исполнитель*/
          user: [],
          /** Статус (ид)*/
          statusId: 'a',
          /** Статус (текст)*/
          statusText: 'a',
          /** Критичность (0 - None (no color) / 1 - Error (red) / 2 - Warning (yellow) / 3 - Success (green))*/
          criticality: '1',
          date: Date.now()
        }
      ]}/>
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

  const shellAsideStyle: any = {
    position: 'fixed',
    top: '20px',
    bottom: '20px',
    left: '20px',
    width: '80px',
    borderRadius: '20px',
    backgroundColor: 'white'
  };

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

        <div style={shellAsideStyle}/>
        <div style={{ marginLeft: '120px' }}>
          <PageWithSections sections={sections} actionMenu={actionMenu} preloader={!loaded} title='Изменение графика рабочего времени' backUrl='/'/>
        </div>
      </div>
    </BrowserRouter>
  );
};
