"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var Menu_1 = require("../../molecules/Menu/Menu");
var List = function (_a) {
    var list = _a.list;
    var onElementClick = function (e, li) {
        e.stopPropagation();
        !li.url && e.preventDefault();
        li.handler && li.handler();
        onClose && onClose();
    };
    var onClose = react_1.useContext(Menu_1.MenuContext).onClose;
    var listElementJSX = list &&
        list.map(function (li, i) {
            var disabledClass = li.disabled ? 'rf-list__element--disabled' : '';
            var separatedClass = li.separated ? 'rf-list__element--separated' : '';
            return (react_1.default.createElement("li", { className: 'rf-li', key: li.value || i },
                li.separated && react_1.default.createElement("div", { className: 'rf-list__separator' }),
                li.url ? (react_1.default.createElement(react_router_dom_1.NavLink, { to: li.url, className: "rf-list__element " + disabledClass + " " + separatedClass, onClick: function (e) { return onElementClick(e, li); } },
                    " ",
                    li.label,
                    " ")) : (react_1.default.createElement("div", { className: "rf-list__element " + disabledClass + " " + separatedClass, onClick: function (e) { return onElementClick(e, li); } }, li.label))));
        });
    // -------------------------------------------------------------------------------------------------------------------
    return react_1.default.createElement("ul", { className: 'rf-list' }, listElementJSX);
};
exports.default = List;
