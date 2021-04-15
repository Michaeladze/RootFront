import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Chevron from '../../../_icons/chevron-left-outline';
import { Preloader, Tabs } from '../../../../index';
import User from '../../molecules/User';
var Page = function (_a) {
    // -------------------------------------------------------------------------------------------------------------------
    var title = _a.title, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.backUrl, backUrl = _c === void 0 ? '' : _c, onBackUrlClick = _a.onBackUrlClick, user = _a.user, _d = _a.actionsList, actionsList = _d === void 0 ? [] : _d, _e = _a.menuPosition, menuPosition = _e === void 0 ? 'right' : _e, children = _a.children, navigation = _a.navigation, _f = _a.preloader, preloader = _f === void 0 ? false : _f;
    /** Ссылка на страницу */
    var pageRef = useRef(null);
    /** Ссылка на шапку */
    var headerRef = useRef(null);
    /** Ссылка на контент */
    var contentRef = useRef(null);
    /** Расчет отступа сверху для контента */
    useEffect(function () {
        setTimeout(function () {
            if (headerRef.current && contentRef.current) {
                contentRef.current.style.paddingTop = headerRef.current.offsetHeight + "px";
            }
        });
    }, []);
    // -------------------------------------------------------------------------------------------------------------------
    var onBackClick = function (e) {
        if (onBackUrlClick) {
            e.preventDefault();
            onBackUrlClick();
        }
    };
    return (React.createElement("div", { className: "rf-page " + className, ref: pageRef },
        React.createElement("header", { className: 'rf-page__header', ref: headerRef },
            React.createElement("div", { className: 'rf-page__header-inner' },
                React.createElement("div", { className: 'rf-page__header-wrapper' },
                    backUrl && React.createElement(Link, { to: backUrl, onClick: onBackClick, className: 'rf-page__header-back' },
                        React.createElement(Chevron, null)),
                    React.createElement("h2", { className: 'rf-page__title' }, title),
                    React.createElement("div", { className: 'rf-page__user' },
                        React.createElement(User, { user: user, menuPosition: menuPosition, actionsList: actionsList, showName: false, radius: '48px' }))),
                navigation && (React.createElement("div", { className: 'rf-page__tabs' },
                    React.createElement(Tabs, { list: navigation }))))),
        React.createElement("div", { className: 'rf-page__content', ref: contentRef }, preloader ? React.createElement(Preloader, null) : children)));
};
export default Page;
