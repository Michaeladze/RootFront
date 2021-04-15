import React, { useEffect, useState } from 'react';
import Folder from './Folder';
import { clearRecursion } from '../../../utils/treeHelpers';
var SelectTree = function (_a) {
    var list = _a.list, open = _a.open, onChange = _a.onChange, _b = _a.multiple, multiple = _b === void 0 ? true : _b, activeOption = _a.activeOption;
    var _c = useState([]), state = _c[0], setState = _c[1];
    var _d = useState(activeOption), activeItem = _d[0], setActiveItem = _d[1];
    useEffect(function () {
        setActiveItem(activeOption);
    }, [activeOption]);
    // ---------------------------------------------------------------------------------------------------------------------------------------
    /** Рекурсивно определяем, какие чекбоксы нужно чекнуть/хафчекнуть по дефолту */
    useEffect(function () {
        var recursiveCheck = function (list, parent) {
            if (!list) {
                return;
            }
            for (var i = 0; i < list.length; i++) {
                list[i].parent = parent;
                if (list[i].checked) {
                    changeParentsFlags(list[i]);
                    changeChildrenFlags(true, list[i].children);
                    continue;
                }
                recursiveCheck(list[i].children, list[i]);
            }
        };
        recursiveCheck(list);
        setState(list);
    }, [list]);
    // ---------------------------------------------------------------------------------------------------------------------------------------
    /** Изменяем флаги, поднимаясь вверх по дереву */
    var changeParentsFlags = function (item) {
        var parent = item.parent;
        if (parent && parent.children) {
            var checkedChildren = parent.children.filter(function (o) { return o.checked; });
            parent.checked = checkedChildren.length === parent.children.length;
            parent.hasCheckedChild = (checkedChildren.length !== parent.children.length && checkedChildren.length > 0) || !!item.hasCheckedChild;
            changeParentsFlags(parent);
        }
    };
    /** Изменяем флаги, спускаясь вниз по дереву */
    var changeChildrenFlags = function (flag, items) {
        if (items) {
            items.forEach(function (o) {
                o.checked = flag;
                o.hasCheckedChild = false;
                changeChildrenFlags(flag, o.children);
            });
        }
    };
    // ---------------------------------------------------------------------------------------------------------------------------------------
    /** Основная функция изменения состояния компонента */
    var handleChange = function (flag, item) {
        if (multiple) {
            item.checked = flag;
            changeParentsFlags(item);
            changeChildrenFlags(flag, item.children);
        }
        clearRecursion(state);
        var result = JSON.parse(JSON.stringify(state));
        if (!multiple) {
            setActiveItem(item);
        }
        onChange && onChange(item, result);
        setState(result);
    };
    // ---------------------------------------------------------------------------------------------------------------------------------------
    return (React.createElement(Folder, { list: state, onChange: handleChange, open: !!open, multiple: multiple, activeItem: activeItem }));
};
export default SelectTree;
