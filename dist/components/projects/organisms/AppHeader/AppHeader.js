import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../../atoms/Container';
import User from '../../molecules/User';
import Logo from '../../../_icons/vtb-logo';
import { Preloader } from '../../../../index';
var AppHeader = function (_a) {
    var _b = _a.homeUrl, homeUrl = _b === void 0 ? '/' : _b, appName = _a.appName, children = _a.children, _c = _a.user, user = _c === void 0 ? null : _c, _d = _a.actionsList, actionsList = _d === void 0 ? [] : _d, _e = _a.showShadow, showShadow = _e === void 0 ? true : _e, _f = _a.className, className = _f === void 0 ? '' : _f;
    return (React.createElement("header", { className: "app__header " + (showShadow ? 'app__header--shadow' : '') + " " + className },
        React.createElement(Container, null,
            React.createElement("div", { className: 'app__header-content' },
                React.createElement(Link, { to: homeUrl, className: 'app-header__logo' },
                    React.createElement(Logo, { className: 'app-header__logo-icon' }),
                    React.createElement("span", { className: 'app-header__logo-name' }, appName)),
                React.createElement("div", { className: 'app__header-content-wrapper' }, children && children),
                React.createElement("div", { className: 'header-menu__user' }, user ? React.createElement(User, { actionsList: actionsList, user: user }) : React.createElement(Preloader, null))))));
};
export default AppHeader;
