import { IListElement, IOption } from './index';
import { ReactNode } from 'react';

/** Пользователь */
export interface IUser {
  /** Уникальный ID пользователя */
  id: string;
  /** ФИО */
  fullName: string;
  /** Имя */
  firstName: string;
  /** Фамилия */
  lastName: string;
  /** Отчество */
  middleName: string;
  /** Ссылка на фото */
  photo: string;
  /** Должность */
  position: string;
  /** ID должности  */
  positionId?: string;
  /** Подразделение */
  department: string;
  /** Департамент ID */
  departmentId?: string;
  /** Департамент - орг структура */
  departmentPath?: string;
  /** Почта */
  email?: string;
  /** Оклад */
  salary?: number;
  /** Валюта */
  currency?: string;
  /** Орг структура */
  departmentsPath?: IStructure[];
}

export interface IStructure {
  id: string;
  name: string;
  unitType: string;
  unitTypeDesc: string;
}

export interface IFeedback {
  /** ID ОС */
  id?: string;
  /** Дата timestamp в миллисекундах */
  zdate: string;
  /** ID проекта */
  projectId: string;
  /** Оценка */
  rate: number;
  /** Статус ОС (По умолчанию 0)*/
  status: string;
  /** Текстовое сообщение пользователя */
  text: string;
  /** Уникальный ID пользователя */
  userId: string;
  /** ФИО пользователя */
  userName: string;
  /** Должность пользователя */
  userPosition: string;
  /** Департамент пользователя */
  userDepartment: string;
  /** Фото пользователя */
  photo: string;
  /** Почта пользователя */
  email: string;
  /** Вложение */
  file64: string;
  /** Размер экрана */
  screen: string;
  /** Информация о браузере */
  browser: string;
}

/** Интерфейс шаблона страницы - Список действий */
export interface IActionMenuListConfig {
  sortList: IOption[];
  defaultSortValue?: string;
  actionList: IListElement[];
  onSort: (sortParam: string) => void;
  onSearch: (searchStr: string) => void;
  onClear: () => void;
  /** Подпись на кнопке */
  actionLabel?: string;
  singleAction?: () => void;
}

/** Секции для шаблона */
export interface IPageSection {
  id: string;
  title?: ReactNode;
  component: ReactNode;
}

/** Возвращаемое значение календаря */
export interface IDateVariants {
  date: {
    from: Date;
    to: Date;
    value: Date;
  };
  timestamp: {
    from: number;
    to: number;
    value: number;
  }
  value: string;
}
