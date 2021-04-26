"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var index_1 = require("../../../../index");
var angle_down_1 = __importDefault(require("../../../_icons/angle-down"));
require("./ActionMenu.scss");
var ActionMenu = function (_a) {
    // -------------------------------------------------------------------------------------------------------------------
    var _b = _a.type, type = _b === void 0 ? 'default' : _b, listConfig = _a.listConfig, children = _a.children;
    var getSortValue = function (o) {
        listConfig === null || listConfig === void 0 ? void 0 : listConfig.onSort(o.value);
    };
    var handleSearch = function (e) {
        listConfig === null || listConfig === void 0 ? void 0 : listConfig.onSearch(e.target.value);
    };
    var listJSX = listConfig && (react_1.default.createElement("div", { className: 'rf-action-menu__header' },
        react_1.default.createElement("div", { className: 'rf-action-menu__sorting' }, listConfig.sortList.length > 0 && listConfig &&
            react_1.default.createElement(index_1.Select, { readOnly: true, options: listConfig.sortList, value: listConfig.defaultSortValue || listConfig.sortList[0].value, getValue: getSortValue })),
        react_1.default.createElement("div", { className: 'rf-action-menu__search' },
            react_1.default.createElement(index_1.Input, { onKeyUp: handleSearch, placeholder: '\u041F\u043E\u0438\u0441\u043A', search: true, onClear: listConfig.onClear })),
        listConfig.singleAction && (react_1.default.createElement("div", { className: 'rf-action-menu__list-button' },
            react_1.default.createElement(index_1.Button, { onClick: listConfig.singleAction }, listConfig.actionLabel || 'Создать'))),
        !listConfig.singleAction && listConfig.actionList.length > 0 && (react_1.default.createElement("div", { className: 'rf-action-menu__list-button' },
            react_1.default.createElement(index_1.Menu, { list: listConfig.actionList, position: 'right' },
                react_1.default.createElement(index_1.Button, null,
                    listConfig.actionLabel || 'Создать',
                    react_1.default.createElement(angle_down_1.default, { className: 'rf-action-menu__list-button-icon' })))))));
    // -------------------------------------------------------------------------------------------------------------------
    return (react_1.default.createElement("div", { className: "rf-action-menu rf-action-menu--" + type }, type === 'list' ? listJSX : children));
};
exports.default = ActionMenu;
