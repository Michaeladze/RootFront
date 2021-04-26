"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var angle_down_1 = __importDefault(require("../../_icons/angle-down"));
var react_router_dom_1 = require("react-router-dom");
require("./Breadcrumbs.scss");
var Breadcrumbs = function (_a) {
    var list = _a.list;
    var listJSX = list.map(function (b, i) { return (react_1.default.createElement("div", { className: 'breadcrumb', key: i },
        react_1.default.createElement(react_router_dom_1.Link, { to: b.url, className: "breadcrumb__link " + (b.disabled ? 'breadcrumb__link--disabled' : '') }, b.label),
        react_1.default.createElement(angle_down_1.default, { className: 'breadcrumb__angle' }))); });
    return react_1.default.createElement("div", { className: 'breadcrumbs' }, listJSX);
};
exports.default = Breadcrumbs;
