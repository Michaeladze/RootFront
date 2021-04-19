import { ReactNode } from 'react';

/** Элемент списка для Radio, Checkbox и Select */
export interface IOption {
  label: string;
  value: string;
  disabled?: boolean;
  node?: ReactNode;
}

export interface ITreeOption extends IOption {
  checked: boolean;
  hasCheckedChild?: boolean;
  parent?: ITreeOption;
  children?: ITreeOption[];
}

export interface ICustomOption extends IOption {
  __isNew__: boolean;
}

export function isCustomOption(option: IOption | ICustomOption): option is ICustomOption {
  return (option as ICustomOption).__isNew__;
}

/** Таб */
export interface ITab {
  /** Название вкладки */
  label: ReactNode;
  /** Содержание вкладки */
  tab?: ReactNode;
  /** Доступность вкладки */
  disabled?: boolean;
  /** Активная вкладка */
  active?: boolean;
  /** Ссылка */
  url?: string;
}

/** Элемент выпадающего списка */
export interface IListElement {
  /** Компонент элемента */
  label: ReactNode;
  /** Обработчик */
  handler?: () => void;
  /** Ссылка */
  url?: string;
  /** ID значение */
  value?: string;
  /** Disabled */
  disabled?: boolean;
  /** Отделение линией */
  separated?: boolean;
}

/** Контекст меню */
export interface IMenuContext {
  onClose: () => void;
}

/** Результат обработки файла */
export interface IFileData {
  file: File;
  base64: string;
  base64Compressed?: string;
}

/** Чипсы */
export interface IChips {
  id: string;
  name: string;
  disabled?: boolean;
}

/** Форматированная дата */
export interface IFormattedDate {
  month: string;
  monthLong: string;
  monthShort: string;
  monthName: string;
  dayOfMonth: string;
  dayOfWeek: string;
  hour: string;
  minutes: string;
  year: number;
  date: string;
  time: string;
}

/** Хлебные крошки */
export interface IBreadcrumb {
  label: string;
  url: string;
  disabled?: boolean;
}

/** Тип цветового оформления */
export type Variant = 'base' | 'accent' | 'info' | 'complement' | 'danger' | 'warning' | 'success';

/** Размер */
export type Size = 'small' | 'medium' | 'big';

/** Формат даты для дейтпикера */
export type DateFormat = 'dd.mm.yy' | 'dd.mm.yyyy';
