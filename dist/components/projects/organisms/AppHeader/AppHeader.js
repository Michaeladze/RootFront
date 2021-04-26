"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./AppHeader.scss");
var react_router_dom_1 = require("react-router-dom");
var Container_1 = __importDefault(require("../../../atoms/Container"));
var User_1 = __importDefault(require("../../molecules/User"));
var vtb_logo_1 = __importDefault(require("../../../_icons/vtb-logo"));
var index_1 = require("../../../../index");
var AppHeader = function (_a) {
    var _b = _a.homeUrl, homeUrl = _b === void 0 ? '/' : _b, appName = _a.appName, children = _a.children, _c = _a.user, user = _c === void 0 ? null : _c, _d = _a.actionsList, actionsList = _d === void 0 ? [] : _d, _e = _a.showShadow, showShadow = _e === void 0 ? true : _e, _f = _a.className, className = _f === void 0 ? '' : _f;
    return (react_1.default.createElement("header", { className: "app__header " + (showShadow ? 'app__header--shadow' : '') + " " + className },
        react_1.default.createElement(Container_1.default, null,
            react_1.default.createElement("div", { className: 'app__header-content' },
                react_1.default.createElement(react_router_dom_1.Link, { to: homeUrl, className: 'app-header__logo' },
                    react_1.default.createElement(vtb_logo_1.default, { className: 'app-header__logo-icon' }),
                    react_1.default.createElement("span", { className: 'app-header__logo-name' }, appName)),
                react_1.default.createElement("div", { className: 'app__header-content-wrapper' }, children && children),
                react_1.default.createElement("div", { className: 'header-menu__user' }, user ? react_1.default.createElement(User_1.default, { actionsList: actionsList, user: user }) : react_1.default.createElement(index_1.Preloader, null))))));
};
exports.default = AppHeader;
