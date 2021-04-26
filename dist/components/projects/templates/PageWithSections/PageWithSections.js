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
var index_1 = require("../../../../index");
var useTableOfContents_1 = __importDefault(require("../../../../hooks/useTableOfContents"));
require("./PageWithSections.scss");
var PageWithSections = function (_a) {
    var sections = _a.sections, actionMenu = _a.actionMenu, _b = _a.preloader, preloader = _b === void 0 ? false : _b;
    /** Ссылка на навигацию */
    var asideRef = react_1.useRef(null);
    /** Ссылка на меню */
    var actionMenuRef = react_1.useRef(null);
    /** Ссылка на секции */
    var sectionsRef = react_1.useRef(null);
    /** Ссылка на разделитель скролла */
    var dividerRef = react_1.useRef(null);
    /** Ссылка на ползунок */
    var sliderRef = react_1.useRef(null);
    /** Ссылка на линию */
    var lineRef = react_1.useRef(null);
    /** Прокрутка до отображения разделителя */
    var SHOW_DIVIDER_SCROLL_TOP = 10;
    /** Дополнительной отступ для активации секции в оглавлении */
    var ADDITIONAL_SCROLL_OFFSET = 30;
    // -------------------------------------------------------------------------------------------------------------------
    /** Расчет координаты для Aside */
    react_1.useEffect(function () {
        var calculateRightPosition = function () {
            var pageHeader = document.querySelector('.rf-page__header');
            var widthDelta = window.innerWidth - 1368;
            if (asideRef.current) {
                var actionMenuHeight = 0;
                if (!actionMenu) {
                    actionMenuHeight = 0;
                }
                if (actionMenuRef.current) {
                    actionMenuHeight = actionMenuRef.current.offsetHeight;
                    actionMenuRef.current.style.top = pageHeader.offsetHeight + "px";
                }
                if (pageHeader) {
                    asideRef.current.style.top = pageHeader.offsetHeight + actionMenuHeight + "px";
                }
                if (widthDelta > 0) {
                    asideRef.current.style.right = widthDelta + 40 + "px";
                }
            }
        };
        setTimeout(function () {
            calculateRightPosition();
        });
        window.addEventListener('resize', calculateRightPosition);
        return function () {
            window.removeEventListener('resize', calculateRightPosition);
        };
    }, [actionMenu]);
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
    react_1.useEffect(function () {
        if (sectionsRef.current) {
            if (!actionMenu) {
                sectionsRef.current.style.paddingTop = '0';
            }
            else if (actionMenuRef.current) {
                sectionsRef.current.style.paddingTop = actionMenuRef.current.offsetHeight + "px";
            }
        }
    }, [actionMenu]);
    // -------------------------------------------------------------------------------------------------------------------
    /** Отображение секций */
    var sectionsJSX = sections === null || sections === void 0 ? void 0 : sections.map(function (section) {
        return (react_1.default.createElement("section", { key: section.id, className: 'rf-page__section' },
            section.title && react_1.default.createElement("h2", { className: 'rf-page__section-title', id: section.id }, section.title),
            react_1.default.createElement(index_1.Tile, null, section.component)));
    });
    // -------------------------------------------------------------------------------------------------------------------
    /** Активная секция при скролле */
    var _c = useTableOfContents_1.default({
        container: sectionsRef,
        selector: '.rf-page__section-title',
        additionalOffset: ADDITIONAL_SCROLL_OFFSET + (actionMenuRef.current ? actionMenuRef.current.offsetHeight : 0),
        deps: [preloader]
    }), activeTitleId = _c.activeTitleId, activeIndex = _c.activeIndex;
    // -------------------------------------------------------------------------------------------------------------------
    /** Боковая навигация для секций */
    var asideJSX = sections === null || sections === void 0 ? void 0 : sections.filter(function (section) { return !!section.title; }).map(function (section) {
        var onNavClick = function () {
            var pageHeader = document.querySelector('.rf-page__header');
            var block = document.getElementById(section.id);
            if (block && pageHeader) {
                var menuOffset = actionMenuRef.current ? actionMenuRef.current.offsetHeight : 0;
                var top_1 = block.getBoundingClientRect().top + pageYOffset - pageHeader.offsetHeight - menuOffset;
                window.scrollTo(0, top_1);
            }
        };
        return (react_1.default.createElement("div", { key: section.id, className: 'rf-page__aside-link', onClick: onNavClick }, section.title));
    });
    /** Передвигаем слайдер к активной секции */
    react_1.useEffect(function () {
        setTimeout(function () {
            if (sliderRef.current) {
                var pageHeader = document.querySelector('.rf-page__header');
                var navLinks = document.querySelectorAll('.rf-page__aside-link');
                var navLink = navLinks[activeIndex];
                if (pageHeader && navLink) {
                    var menuOffset = actionMenuRef.current ? actionMenuRef.current.offsetHeight : 0;
                    sliderRef.current.style.top = navLink.getBoundingClientRect().top - pageHeader.offsetHeight - menuOffset + "px";
                }
            }
        });
    }, [activeTitleId]);
    // -------------------------------------------------------------------------------------------------------------------
    var showAside = !!sections && sections.some(function (s) { return !!s.title; });
    var asideBlock = showAside && (react_1.default.createElement("aside", { className: 'rf-page__content-aside', ref: asideRef },
        react_1.default.createElement("div", { className: 'rf-page__aside-inner' },
            react_1.default.createElement("div", { className: 'rf-page__aside-bar', ref: lineRef },
                react_1.default.createElement("div", { className: 'rf-page__aside-slider', ref: sliderRef })),
            react_1.default.createElement("nav", { className: 'rf-page__aside-nav' }, asideJSX))));
    // -------------------------------------------------------------------------------------------------------------------
    var actionMenuHideClass = actionMenu ? '' : 'rf-page__action-menu--hidden';
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "rf-page__action-menu " + actionMenuHideClass, ref: actionMenuRef },
            react_1.default.createElement("div", { className: 'rf-page__action-menu-inner' },
                react_1.default.createElement("div", { className: 'rf-page__action-menu-divider', ref: dividerRef }),
                actionMenu && actionMenu)),
        react_1.default.createElement("div", { className: 'rf-page__content--sections' }, preloader ? react_1.default.createElement(index_1.Preloader, null) : (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("div", { className: 'rf-page__content-sections', ref: sectionsRef }, sectionsJSX),
            asideBlock)))));
};
exports.default = PageWithSections;
