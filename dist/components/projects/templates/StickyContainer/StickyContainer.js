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
// @ts-ignore
var sticky_sidebar_v2_1 = __importDefault(require("sticky-sidebar-v2"));
var resize_observer_1 = require("resize-observer");
require("./StickyContainer.scss");
var StickyContainer = function (_a) {
    var containerSelector = _a.containerSelector, scrollContainer = _a.scrollContainer, children = _a.children, _b = _a.top, top = _b === void 0 ? 0 : _b, _c = _a.bottom, bottom = _c === void 0 ? 0 : _c;
    var container = react_1.useRef(null);
    react_1.useEffect(function () {
        var sidebar;
        if (container.current) {
            /** IE 11 polyfill - всегда переопределяет ResizeObserver, поэтому сначала проверка */
            if (!window.ResizeObserver) {
                resize_observer_1.install();
            }
            /** https://blixhavn.github.io/sticky-sidebar-v2/ */
            sidebar = new sticky_sidebar_v2_1.default('.rf-sticky-container', {
                containerSelector: containerSelector,
                scrollContainer: scrollContainer,
                innerWrapperSelector: '.rf-sticky-element',
                topSpacing: top,
                bottomSpacing: bottom
            });
        }
        return function () {
            sidebar.destroy();
        };
    }, [top, bottom]);
    return (react_1.default.createElement("div", { className: 'rf-sticky-container', ref: container },
        react_1.default.createElement("div", { className: 'rf-sticky-element' }, children)));
};
exports.default = StickyContainer;
