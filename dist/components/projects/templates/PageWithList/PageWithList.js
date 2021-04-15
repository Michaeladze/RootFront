import React, { useEffect, useRef, useState } from 'react';
import { Preloader } from '../../../../index';
import StickyContainer from '../StickyContainer';
var PageWithList = function (_a) {
    var children = _a.children, filters = _a.filters, actionMenu = _a.actionMenu, _b = _a.preloader, preloader = _b === void 0 ? false : _b;
    /** Ссылка контейнер страницы */
    var _c = useState(null), listPageRef = _c[0], setNode = _c[1];
    /** Ссылка на меню */
    var actionMenuRef = useRef(null);
    /** Ссылка на разделитель скролла */
    var dividerRef = useRef(null);
    /** Ссылка на контент */
    var mainRef = useRef(null);
    /** Прокрутка до отображения разделителя */
    var SHOW_DIVIDER_SCROLL_TOP = 10;
    /** Отступ снизу при прокрутке блока фильтров */
    var FILTERS_OFFSET_SCROLL_BOTTOM = 33;
    /** Горизонтальный паддинг ActionMenu */
    var ACTION_MENU_PADDING = 16;
    // -------------------------------------------------------------------------------------------------------------------
    /** Показать разделитель при скролле */
    useEffect(function () {
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
    useEffect(function () {
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
    var _d = useState(0), top = _d[0], setTop = _d[1];
    useEffect(function () {
        setTimeout(function () {
            if (listPageRef) {
                setTop(listPageRef.getBoundingClientRect().top);
            }
        });
    }, [listPageRef]);
    var stylesForActionMenu = filters ? { maxWidth: '1000px' } : { maxWidth: '1320px' };
    return (React.createElement("div", { className: 'rf-page__with-list', ref: function (node) { return setNode(node); } }, preloader ? React.createElement(Preloader, null) : (React.createElement(React.Fragment, null,
        filters && (React.createElement("aside", { className: 'rf-page__aside-filters' },
            React.createElement(StickyContainer, { containerSelector: '.rf-page__with-list', top: top, bottom: FILTERS_OFFSET_SCROLL_BOTTOM },
                React.createElement("div", { className: 'rf-page__aside-filters-inner' }, filters)))),
        React.createElement("main", { className: 'rf-page__main', ref: mainRef },
            actionMenu && React.createElement("div", { className: 'rf-page__main-action-menu', style: stylesForActionMenu, ref: actionMenuRef },
                React.createElement("div", { className: 'rf-page__main-action-menu-inner' },
                    React.createElement("div", { className: 'rf-page__action-menu-divider--list', ref: dividerRef }),
                    actionMenu)),
            React.createElement("div", { className: 'rf-page__main-content' }, children))))));
};
export default PageWithList;
