import { IListElement, IOption } from './index';

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

/** интерфейс шаблона страницы - Список действий */
export interface IActionMenuListConfig {
  sortList: IOption[];
  actionList: IListElement[];
  onSort: (sortParam: string) => void;
  onSearch: (searchStr: string) => void;
  onClear: () => void;
  /** Подпись на кнопке при множественном выбор */
  actionLabel?: string;
}
