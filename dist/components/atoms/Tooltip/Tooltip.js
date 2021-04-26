"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_dom_1 = require("react-dom");
require("./Tooltip.scss");
var TooltipContent = function (_a) {
    var _b;
    var rect = _a.rect, children = _a.children, position = _a.position, className = _a.className, portal = _a.portal;
    var div = react_1.useMemo(function () { return document.createElement('div'); }, []);
    /** При маунте добавляем модалку. При дестрое - удаляем. */
    react_1.useEffect(function () {
        /** Контейнер для модалки */
        document.body.appendChild(div);
        return function () {
            document.body.removeChild(div);
        };
    }, [div]);
    rect.y = (rect.y || rect.top) + window.scrollY;
    rect.x = (rect.x || rect.left) + window.scrollX;
    var styles = portal ?
        {
            top: {
                top: rect.y + "px",
                left: rect.x + rect.width / 2 + "px",
                transform: 'translate(-50%, -100%)'
            },
            right: {
                top: rect.y + rect.height / 2 + "px",
                left: rect.x + rect.width + "px",
                transform: 'translate(0, -50%)'
            },
            bottom: {
                top: rect.y + rect.height + "px",
                left: rect.x + rect.width / 2 + "px",
                transform: 'translate(-50%, 0)'
            },
            left: {
                top: rect.y + rect.height / 2 + "px",
                left: rect.x + "px",
                transform: 'translate(-100%, -50%)'
            }
        } :
        {
            top: {
                top: '0',
                left: '50%',
                transform: 'translate(-50%, -100%)'
            },
            right: {
                top: '50%',
                left: '100%',
                transform: 'translate(0, -50%)'
            },
            bottom: {
                top: '100%',
                left: '50%',
                transform: 'translate(-50%, 0)'
            },
            left: {
                top: '50%',
                left: '0',
                transform: 'translate(-100%, -50%)'
            }
        };
    var padding = {
        top: 'paddingBottom',
        right: 'paddingLeft',
        bottom: 'paddingTop',
        left: 'paddingRight'
    };
    var stopPropagationWheel = function (e) {
        e.stopPropagation();
    };
    var tooltip = (react_1.default.createElement("div", { className: 'rf-tooltip__content-wrapper', onWheel: stopPropagationWheel, style: __assign(__assign({}, styles[position]), (_b = {}, _b[padding[position]] = '8px', _b)) },
        react_1.default.createElement("div", { className: "rf-tooltip__content " + className },
            react_1.default.createElement("div", { className: "rf-tooltip__inner rf-tooltip__inner--" + position }, children))));
    return portal ? react_dom_1.createPortal(tooltip, div) : tooltip;
};
var Tooltip = function (_a) {
    var children = _a.children, _b = _a.position, position = _b === void 0 ? 'right' : _b, _c = _a.isVisible, isVisible = _c === void 0 ? true : _c, _d = _a.className, className = _d === void 0 ? '' : _d, _e = _a.portal, portal = _e === void 0 ? false : _e;
    var _f = react_1.useState(null), tooltipRect = _f[0], setTooltipRect = _f[1];
    var onScrollElementScroll = react_1.useCallback(function () {
        setTooltipRect(null);
    }, []);
    var addListener = function (add) {
        if (add) {
            window.addEventListener('mousewheel', onScrollElementScroll);
        }
        else {
            window.removeEventListener('mousewheel', onScrollElementScroll);
        }
    };
    var onMouseEnter = function (e) {
        var child = e.currentTarget.firstElementChild;
        if (child) {
            addListener(true);
            setTooltipRect(child.getBoundingClientRect());
        }
    };
    var onMouseLeave = function () {
        addListener(false);
        setTooltipRect(null);
    };
    var stopPropagation = function (e) {
        e.stopPropagation();
    };
    return (react_1.default.createElement("div", { className: 'rf-tooltip', onMouseEnter: onMouseEnter, onMouseLeave: onMouseLeave, onClick: stopPropagation, onMouseUp: stopPropagation },
        children[0],
        tooltipRect && isVisible && (react_1.default.createElement(TooltipContent, { className: className, position: position, rect: tooltipRect, portal: portal }, children[1]))));
};
exports.default = Tooltip;
