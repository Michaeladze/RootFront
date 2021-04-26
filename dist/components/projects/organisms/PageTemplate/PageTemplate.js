"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var angle_down_1 = __importDefault(require("../../../_icons/angle-down"));
var react_router_dom_1 = require("react-router-dom");
var Breadcrumbs_1 = __importDefault(require("../../../molecules/Breadcrumbs"));
var Button_1 = __importDefault(require("../../../atoms/Button"));
var Container_1 = __importDefault(require("../../../atoms/Container"));
require("./PageTemplate.scss");
var PageTemplate = function (_a) {
    var title = _a.title, breadcrumbs = _a.breadcrumbs, children = _a.children, _b = _a.backUrl, backUrl = _b === void 0 ? '/' : _b, _c = _a.className, className = _c === void 0 ? '' : _c, _d = _a.onlyTitle, onlyTitle = _d === void 0 ? false : _d;
    return (react_1.default.createElement("div", { className: "page-template " + className },
        react_1.default.createElement("div", { className: 'page-template__underlay' }),
        react_1.default.createElement(Container_1.default, null,
            react_1.default.createElement("div", { className: 'page-template__content-wrapper' },
                react_1.default.createElement("header", { className: 'page-template__header' },
                    react_1.default.createElement("div", { className: 'page-template__header-row' },
                        !onlyTitle && (react_1.default.createElement(react_router_dom_1.Link, { to: backUrl },
                            react_1.default.createElement(Button_1.default, { buttonType: 'round', className: 'page-template__header-back' },
                                react_1.default.createElement(angle_down_1.default, { className: 'page-template__header-icon' })))),
                        react_1.default.createElement("h2", { className: 'page-template__title' }, title)),
                    !onlyTitle && breadcrumbs && react_1.default.createElement(Breadcrumbs_1.default, { list: breadcrumbs })),
                react_1.default.createElement("div", { className: 'page-template__content' }, children)))));
};
exports.default = PageTemplate;
