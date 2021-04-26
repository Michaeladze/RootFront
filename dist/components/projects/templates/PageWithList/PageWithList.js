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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./PageWithList.scss");
var index_1 = require("../../../../index");
var StickyContainer_1 = __importDefault(require("../StickyContainer"));
var PageWithList = function (_a) {
    var children = _a.children, filters = _a.filters, actionMenu = _a.actionMenu, _b = _a.preloader, preloader = _b === void 0 ? false : _b;
    /** Ссылка контейнер страницы */
    var _c = react_1.useState(null), listPageRef = _c[0], setNode = _c[1];
    /** Ссылка на меню */
    var actionMenuRef = react_1.useRef(null);
    /** Ссылка на разделитель скролла */
    var dividerRef = react_1.useRef(null);
    /** Ссылка на контент */
    var mainRef = react_1.useRef(null);
    /** Прокрутка до отображения разделителя */
    var SHOW_DIVIDER_SCROLL_TOP = 10;
    /** Отступ снизу при прокрутке блока фильтров */
    var FILTERS_OFFSET_SCROLL_BOTTOM = 33;
    /** Горизонтальный паддинг ActionMenu */
    var ACTION_MENU_PADDING = 16;
    // -------------------------------------------------------------------------------------------------------------------
    /** Показать разделитель при скролле */
    react_1.useEffect(function () {
        var onScroll = function () {
            if (dividerRef.current) {
                dividerRef.current.style.opacity = pageYOffset >= SHOW_DIVIDER_SCROLL_TOP ? '1' : '0';
            }
        };
        window.addEventListener('scroll', onScroll);
        return function () {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);
    // -------------------------------------------------------------------------------------------------------------------
    /** Расчет координаты для Aside */
    react_1.useEffect(function () {
        var calculatePosition = function () {
            var pageHeader = document.querySelector('.rf-page__header');
            if (actionMenuRef.current) {
                if (pageHeader) {
                    actionMenuRef.current.style.top = pageHeader.offsetHeight + "px";
                }
                if (mainRef.current) {
                    mainRef.current.style.paddingTop = actionMenuRef.current.offsetHeight + "px";
                    actionMenuRef.current.style.left = mainRef.current.getBoundingClientRect().left - ACTION_MENU_PADDING + 'px';
                    actionMenuRef.current.style.width = mainRef.current.getBoundingClientRect().width + 'px';
                }
            }
        };
        setTimeout(function () {
            calculatePosition();
        });
        window.addEventListener('resize', calculatePosition);
        return function () {
            window.removeEventListener('resize', calculatePosition);
        };
    }, [actionMenu]);
    var _d = react_1.useState(0), top = _d[0], setTop = _d[1];
    react_1.useEffect(function () {
        setTimeout(function () {
            if (listPageRef) {
                setTop(listPageRef.getBoundingClientRect().top);
            }
        });
    }, [listPageRef]);
    var stylesForActionMenu = filters ? { maxWidth: '1000px' } : { maxWidth: '1320px' };
    var actionMenuHideClass = actionMenu ? '' : 'rf-page__main-action-menu--hidden';
    var noFiltersAndMenuClass = !actionMenu && !filters ? 'rf-page__main-action-menu--no-filters' : '';
    return (react_1.default.createElement("div", { className: 'rf-page__with-list', ref: function (node) { return setNode(node); } }, preloader ? react_1.default.createElement(index_1.Preloader, null) : (react_1.default.createElement(react_1.default.Fragment, null,
        filters && (react_1.default.createElement("aside", { className: 'rf-page__aside-filters' },
            react_1.default.createElement(StickyContainer_1.default, { containerSelector: '.rf-page__with-list', top: top, bottom: FILTERS_OFFSET_SCROLL_BOTTOM },
                react_1.default.createElement("div", { className: 'rf-page__aside-filters-inner' }, filters)))),
        react_1.default.createElement("main", { className: 'rf-page__main', ref: mainRef },
            react_1.default.createElement("div", { className: "rf-page__main-action-menu " + actionMenuHideClass + " " + noFiltersAndMenuClass, style: stylesForActionMenu, ref: actionMenuRef },
                react_1.default.createElement("div", { className: 'rf-page__main-action-menu-inner' },
                    react_1.default.createElement("div", { className: 'rf-page__action-menu-divider--list', ref: dividerRef }),
                    actionMenu && actionMenu)),
            react_1.default.createElement("div", { className: 'rf-page__main-content' }, children))))));
};
exports.default = PageWithList;
