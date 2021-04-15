export var treeDeepSearch = function (list, query) {
    if (query.length === 0) {
        return list;
    }
    clearRecursion(list);
    var copy = JSON.parse(JSON.stringify(list));
    var q = query.toLowerCase();
    var dfs = function (list, query) {
        if (!list) {
            return [];
        }
        var result = [];
        list.forEach(function (o) {
            if (o.label.toLowerCase().includes(query)) {
                result.push(o);
            }
            else {
                var children = dfs(o.children, query);
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
export var clearRecursion = function (list) {
    list.forEach(function (o) {
        delete o.parent;
        if (o.children) {
            clearRecursion(o.children);
        }
    });
};
