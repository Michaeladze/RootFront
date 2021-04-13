import { ITreeOption } from '../types';

export const treeDeepSearch = (list: ITreeOption[], query: string): ITreeOption[] => {
  if (query.length === 0) {
    return list;
  }

  clearRecursion(list);
  const copy: ITreeOption[] = JSON.parse(JSON.stringify(list));
  const q = query.toLowerCase();

  const dfs = (list: ITreeOption[] | undefined, query: string): ITreeOption[] => {
    if (!list) {
      return [];
    }

    const result: ITreeOption[] = [];

    list.forEach((o: ITreeOption) => {
      if (o.label.toLowerCase().includes(query)) {
        result.push(o);
      } else {
        const children: ITreeOption[] = dfs(o.children, query);

        if (children.length > 0) {
          o.children = children;
          result.push(o);
        }
      }
    });

    return result;
  };

  return dfs(copy, q);
};

/**
 * Компонент SelectTree рекурсивно мутирует list, добавляя в каждый элемент свойство parent. Так как на уровне текущего компонента SelectTree
 * необходимо делать глубокое копирование для создания нового state, все рекурсии нужно удалить.
 * */
export const clearRecursion = (list: ITreeOption[]) => {
  list.forEach((o: ITreeOption) => {
    delete o.parent;

    if (o.children) {
      clearRecursion(o.children);
    }
  });
};
