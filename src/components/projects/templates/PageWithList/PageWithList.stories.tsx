import React, { ReactNode } from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Page, Tile } from '../../../../index';
import ActionMenu from '../ActionMenu';
import { ITab } from '../../../../types';
import PageWithList from './PageWithList';
import { IActionMenuListConfig } from '../../../../types/projects.types';

export default {
  title: 'Projects/Page With List',
  component: Page
};

export const pageWithList = () => {

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

  const listJSX: ReactNode[] = Array(8).fill('').map((_, i: number) => <Tile> Tile {i}</Tile>);

  const user: any = { fullName: 'Ричард Брэндмауер' };

  const config: IActionMenuListConfig = {
    sortList: [
      {
        label: 'Сортировка А-Я',
        value: 'asc'
      },
      {
        label: 'Сортировка Я-А',
        value: 'desc'
      }
    ],
    actionList: [],
    onSort: (sortParam: string) => {
      console.log(sortParam);
    },
    onSearch: (searchStr: string) => {
      console.log(searchStr);
    },
    onClear: () => {
      console.log('clear');
    }
  };

  const filtersJSX = <>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet aspernatur consectetur enim facere id iste iusto optio perspiciatis, quos recusandae repudiandae sequi, unde. Assumenda cupiditate earum eos iure nam voluptate!
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aperiam atque cum deleniti et fugit ipsum maiores maxime modi nesciunt nobis obcaecati, optio pariatur porro ratione reprehenderit sequi sit tenetur.</>;

  return (
    <BrowserRouter>
      <Page backUrl='/' title='Изменение графика рабочего времени' user={user} navigation={navigation}>
        <PageWithList filters={filtersJSX} actionMenu={<ActionMenu listConfig={config} type='list'/>}>
          {listJSX}
        </PageWithList>
      </Page>
    </BrowserRouter>
  );
};
