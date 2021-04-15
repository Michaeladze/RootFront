import React, {
  ReactNode, useEffect, useState
} from 'react';

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

  const listJSX: ReactNode[] = Array(12).fill('').map((_, i: number) => <Tile> Tile {i}</Tile>);

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
    actionList: [
      {
        label: 'Создать новую заявку',
        url: '/'
      }
    ],
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const filtersJSX = <>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, saepe similique. Animi aut blanditiis corporis dicta dolore eos, eveniet explicabo fugiat iste minima modi neque nostrum nulla possimus quas voluptates.
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus animi aperiam architecto, autem dicta id maiores maxime minima, modi natus nihil nulla quaerat quia saepe sapiente sit ut vero.
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias amet assumenda at blanditiis exercitationem in reiciendis. Accusantium eaque magni molestias quam ratione similique sunt voluptates. Ducimus facilis fuga minima numquam!
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet consequuntur corporis, dolor dolores doloribus eligendi facilis fugiat itaque non perferendis repellat voluptatum. Adipisci ex fuga, laborum maxime nobis non omnis.
  </>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const actionMenu = <ActionMenu listConfig={config} type='list'/>;

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  return (
    <BrowserRouter>
      <Page backUrl='/' title='Изменение графика рабочего времени' user={user} navigation={navigation}>
        <PageWithList filters={filtersJSX} preloader={!loaded} actionMenu={<ActionMenu listConfig={config} type='list' />}>
          {listJSX}
        </PageWithList>
      </Page>
    </BrowserRouter>
  );
};
