import React from 'react';
import { Button, Input, Menu, Select } from '../../../../index';
import AngleDown from '../../../_icons/angle-down';
var ActionMenu = function (_a) {
    // -------------------------------------------------------------------------------------------------------------------
    var _b = _a.type, type = _b === void 0 ? 'default' : _b, listConfig = _a.listConfig, children = _a.children;
    var getSortValue = function (o) {
        listConfig === null || listConfig === void 0 ? void 0 : listConfig.onSort(o.value);
    };
    var handleSearch = function (e) {
        listConfig === null || listConfig === void 0 ? void 0 : listConfig.onSearch(e.target.value);
    };
    var listJSX = listConfig && (React.createElement("div", { className: 'rf-action-menu__header' },
        React.createElement("div", { className: 'rf-action-menu__sorting' }, listConfig.sortList.length > 0 && listConfig &&
            React.createElement(Select, { readOnly: true, options: listConfig.sortList, value: listConfig.sortList[0].value, getValue: getSortValue })),
        React.createElement("div", { className: 'rf-action-menu__search' },
            React.createElement(Input, { onKeyUp: handleSearch, placeholder: '\u041F\u043E\u0438\u0441\u043A', search: true, onClear: listConfig.onClear })),
        listConfig.singleAction && (React.createElement("div", { className: 'rf-action-menu__list-button' },
            React.createElement(Button, { onClick: listConfig.singleAction }, listConfig.actionLabel || 'Создать'))),
        !listConfig.singleAction && listConfig.actionList.length > 0 && (React.createElement("div", { className: 'rf-action-menu__list-button' },
            React.createElement(Menu, { list: listConfig.actionList, position: 'right' },
                React.createElement(Button, null,
                    listConfig.actionLabel || 'Создать',
                    React.createElement(AngleDown, { className: 'rf-action-menu__list-button-icon' })))))));
    // -------------------------------------------------------------------------------------------------------------------
    return (React.createElement("div", { className: "rf-action-menu rf-action-menu--" + type }, type === 'list' ? listJSX : children));
};
export default ActionMenu;
