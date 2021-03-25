import { MonoTypeOperatorFunction } from 'rxjs';
import { IFormattedDate, Size, Variant } from '../types';
/**
 * Функция для добавления окончаний к месяцам
 * @param value - имя месяца
 *
 */
export declare const getMonthName: (value: string) => string;
/** Добавить нули */
export declare const addLeadingZeros: (number: number, length?: number) => string;
/**
 * Функция для форматирования даты
 *  @param date - дата, которую нужно преобразовать
 *
 */
export declare const formatDate: (date: string | number | undefined) => IFormattedDate;
/** Преобразовать dd.mm.yyy в Date */
export declare const stringToDate: (s: string) => Date;
/**
 * Функция обрезки текста
 * @param text - строка, которую нужно сократить
 * @param n - количество видимых символов
 * @param symbol - символ, который нужно поставить в конце строки
 */
export declare const getShortString: (text: string, n?: number, symbol?: string) => string;
/** Заменить подстроку по индексу */
export declare const replaceAt: (str: string, index: number, replacement: string) => string;
/** Общий класс для цветового оформления */
export declare const variantClass: Record<string, string>;
export declare const variants: Variant[];
export declare const sizeClass: Record<Size, string>;
export declare const oDataTransform: <T>() => MonoTypeOperatorFunction<T>;
/** Функция для добавления пробелов в число */
export declare const numberWithSpaces: (x: number, n?: number) => string;
