import { ITreeOption } from '../../../types';

export const list: ITreeOption[] = [
  {
    value: '0',
    label: 'ВТБ ПАО',
    checked: false,
    children: []
  },
  {
    value: '1',
    label: 'Департамент технологического развития общебанковских систем',
    checked: false,
    children: [
      {
        value: '1_1',
        label: 'Шапка',
        children: [],
        checked: false
      },
      {
        value: '1_2',
        label: 'Группа развития систем документооборота',
        children: [
          {
            value: '1_2_1',
            label: 'Шапка',
            children: [],
            checked: false
          },
          {
            value: '1_2_2',
            label: 'Служба развития внешних сайтов',
            children: [],
            checked: false
          }
        ],
        checked: false
      },
      {
        value: '1_3',
        label: 'Региональная группа развития внутребанковских сервисов и каналов в г.Санкт-Петербург',
        children: [],
        checked: false
      },
      {
        value: '1_4',
        label: 'Служба развития мобильных и портальных технологий',
        children: [
          {
            value: '1_4_1',
            label: 'Шапка',
            children: [],
            checked: false
          },
          {
            value: '1_4_2',
            label: 'Служба развития внешних сайтов',
            children: [
              {
                value: '1_4_2_1',
                label: 'Служба развития внешних сайтов 1',
                children: [],
                checked: false
              },
              {
                value: '1_4_2_2',
                label: 'Служба развития внешних сайтов 2 Служба развития внешних сайтов 2 Служба развития внешних сайтов 2 Служба развития внешних сайтов 2',
                children: [
                  {
                    value: '1_4_2_2_1',
                    label: 'Служба развития внешних сайтов 2_1',
                    children: [],
                    checked: false
                  },
                  {
                    value: '1_4_2_2_2',
                    label: 'Служба развития внешних сайтов 2_2',
                    children: [],
                    checked: false
                  }
                ],
                checked: false
              }
            ],
            checked: false
          },
          {
            value: '1_4_3',
            label: 'Служба развития внутрнних сайтов',
            children: [],
            checked: false
          }
        ],
        checked: false
      },
      {
        value: '1_5',
        label: 'Департамент нетехнологического развития системы водоснабжения',
        checked: false,
        children: []
      }
    ],
  },
  {
    value: '2',
    label: 'Департамент нетехнологического развития системы водоснабжения',
    checked: false,
    children: []
  }
];
