import React, { useEffect, useRef } from 'react';
import { Preloader, Tile } from '../../../../index';
import useTableOfContents from '../../../../hooks/useTableOfContents';
var PageWithSections = function (_a) {
    var sections = _a.sections, actionMenu = _a.actionMenu, _b = _a.preloader, preloader = _b === void 0 ? false : _b;
    /** Ссылка на навигацию */
    var asideRef = useRef(null);
    /** Ссылка на меню */
    var actionMenuRef = useRef(null);
    /** Ссылка на секции */
    var sectionsRef = useRef(null);
    /** Ссылка на разделитель скролла */
    var dividerRef = useRef(null);
    /** Ссылка на ползунок */
    var sliderRef = useRef(null);
    /** Ссылка на линию */
    var lineRef = useRef(null);
    /** Прокрутка до отображения разделителя */
    var SHOW_DIVIDER_SCROLL_TOP = 10;
    /** Дополнительной отступ для активации секции в оглавлении */
    var ADDITIONAL_SCROLL_OFFSET = 30;
    // -------------------------------------------------------------------------------------------------------------------
    /** Расчет координаты для Aside */
    useEffect(function () {
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
    useEffect(function () {
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
        return (React.createElement("section", { key: section.id, className: 'rf-page__section' },
            section.title && React.createElement("h2", { className: 'rf-page__section-title', id: section.id }, section.title),
            React.createElement(Tile, null, section.component)));
    });
    // -------------------------------------------------------------------------------------------------------------------
    /** Активная секция при скролле */
    var _c = useTableOfContents({
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
        return (React.createElement("div", { key: section.id, className: 'rf-page__aside-link', onClick: onNavClick }, section.title));
    });
    /** Передвигаем слайдер к активной секции */
    useEffect(function () {
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
    var asideBlock = showAside && (React.createElement("aside", { className: 'rf-page__content-aside', ref: asideRef },
        React.createElement("div", { className: 'rf-page__aside-inner' },
            React.createElement("div", { className: 'rf-page__aside-bar', ref: lineRef },
                React.createElement("div", { className: 'rf-page__aside-slider', ref: sliderRef })),
            React.createElement("nav", { className: 'rf-page__aside-nav' }, asideJSX))));
    // -------------------------------------------------------------------------------------------------------------------
    return (React.createElement(React.Fragment, null,
        actionMenu && (React.createElement("div", { className: 'rf-page__action-menu', ref: actionMenuRef },
            React.createElement("div", { className: 'rf-page__action-menu-inner' },
                React.createElement("div", { className: 'rf-page__action-menu-divider', ref: dividerRef }),
                actionMenu))),
        React.createElement("div", { className: 'rf-page__content--sections' }, preloader ? React.createElement(Preloader, null) : (React.createElement(React.Fragment, null,
            React.createElement("div", { className: 'rf-page__content-sections', ref: sectionsRef }, sectionsJSX),
            asideBlock)))));
};
export default PageWithSections;
