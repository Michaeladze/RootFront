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

export interface IRequestPath {
  /** Сфера деятельности*/
  actArea: string;
  /** Ид. пути выполнения*/
  pathId: string;
  /** Шаг маршрута*/
  stepId: string;
  /** Тип шаг (ид)*/
  activityId: string;
  /** Тип шаг (текст)*/
  activityText: string;
  /** Агент (ид)*/
  agent: string;
  /** Агент (текст)*/
  agentName: string;
  /** Фактический исполнитель*/
  user: IUser[];
  /** Статус (ид)*/
  statusId: string;
  /** Статус (текст)*/
  statusText: string;
  /** Критичность (0 - None (no color) / 1 - Error (red) / 2 - Warning (yellow) / 3 - Success (green))*/
  criticality: string;
  date?: number;
  comment?: string;
}
export interface IRequestAttachment{
  /** id вложения */
  id?:string;
  /** Тип вложения */
  attType?:string,
  /** Тип вложения (описание) */
  attTypeText?:string,
  /** Имя файла*/
  fileName:string,
  /** Данные файла в Base64*/
  base64:string,
  /** Данные подписанного файла в Base64 (Для ЭЦП) */
  singBase64?:string,
  /** thumbprint сертификата (Для ЭЦП) */
  cert?:string,
  /** Операция над вложением (I - создать / U - обновить / D - удалить)*/
  action?:string,
  /** Подписанты */
  signer?: IUser[];
}
export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';
