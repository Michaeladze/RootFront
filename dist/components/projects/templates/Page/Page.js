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
var react_router_dom_1 = require("react-router-dom");
var chevron_left_outline_1 = __importDefault(require("../../../_icons/chevron-left-outline"));
var index_1 = require("../../../../index");
var User_1 = __importDefault(require("../../molecules/User"));
require("./Page.scss");
var Page = function (_a) {
    // -------------------------------------------------------------------------------------------------------------------
    var title = _a.title, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.backUrl, backUrl = _c === void 0 ? '' : _c, onBackUrlClick = _a.onBackUrlClick, user = _a.user, _d = _a.actionsList, actionsList = _d === void 0 ? [] : _d, _e = _a.menuPosition, menuPosition = _e === void 0 ? 'right' : _e, children = _a.children, navigation = _a.navigation, _f = _a.preloader, preloader = _f === void 0 ? false : _f;
    /** Ссылка на страницу */
    var pageRef = react_1.useRef(null);
    /** Ссылка на шапку */
    var headerRef = react_1.useRef(null);
    /** Ссылка на контент */
    var contentRef = react_1.useRef(null);
    /** Расчет отступа сверху для контента */
    react_1.useEffect(function () {
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
    return (react_1.default.createElement("div", { className: "rf-page " + className, ref: pageRef },
        react_1.default.createElement("header", { className: 'rf-page__header', ref: headerRef },
            react_1.default.createElement("div", { className: 'rf-page__header-inner' },
                react_1.default.createElement("div", { className: 'rf-page__header-wrapper' },
                    backUrl && react_1.default.createElement(react_router_dom_1.Link, { to: backUrl, onClick: onBackClick, className: 'rf-page__header-back' },
                        react_1.default.createElement(chevron_left_outline_1.default, null)),
                    react_1.default.createElement("h2", { className: 'rf-page__title' }, title),
                    react_1.default.createElement("div", { className: 'rf-page__user' },
                        react_1.default.createElement(User_1.default, { user: user, menuPosition: menuPosition, actionsList: actionsList, showName: false, radius: '48px' }))),
                navigation && (react_1.default.createElement("div", { className: 'rf-page__tabs' },
                    react_1.default.createElement(index_1.Tabs, { list: navigation }))))),
        react_1.default.createElement("div", { className: 'rf-page__content', ref: contentRef }, preloader ? react_1.default.createElement(index_1.Preloader, null) : children)));
};
exports.default = Page;
