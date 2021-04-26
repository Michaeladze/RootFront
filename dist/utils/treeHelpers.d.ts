import { ITreeOption } from '../types';
export declare const treeDeepSearch: (list: ITreeOption[], query: string) => ITreeOption[];
/**
 * Компонент SelectTree рекурсивно мутирует list, добавляя в каждый элемент свойство parent. Так как на уровне текущего компонента SelectTree
 * необходимо делать глубокое копирование для создания нового state, все рекурсии нужно удалить.
 * */
export declare const clearRecursion: (list: ITreeOption[]) => void;
