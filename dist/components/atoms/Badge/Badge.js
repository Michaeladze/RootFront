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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./Badge.scss");
var helpers_1 = require("../../../utils/helpers");
var Badge = function (_a) {
    var badgeContent = _a.badgeContent, children = _a.children, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.variant, variant = _c === void 0 ? 'base' : _c, _d = _a.max, max = _d === void 0 ? 99 : _d, _e = _a.position, position = _e === void 0 ? 'topRight' : _e, _f = _a.display, display = _f === void 0 ? true : _f, _g = _a.placeNear, placeNear = _g === void 0 ? false : _g;
    var wrapper = react_1.useRef(null);
    var isDot = badgeContent ? '' : 'rf-badge--dot';
    var _h = react_1.useState({
        top: 0,
        right: 0
    }), coordinates = _h[0], setCoordinates = _h[1];
    react_1.useLayoutEffect(function () {
        var _a;
        if (badgeContent || placeNear) {
            return;
        }
        var child = (_a = wrapper.current) === null || _a === void 0 ? void 0 : _a.firstElementChild;
        if (child) {
            var w = child.clientWidth;
            var kX = Math.cos(Math.PI / 3);
            var kY = Math.sin(Math.PI / 3);
            var badgeR = 4;
            var coordinates_1 = {
                bottomRight: {
                    top: w / 2 * (kY + 1) - badgeR,
                    right: w / 2 * (1 - kX) - badgeR
                },
                bottomLeft: {
                    top: w / 2 * (kY + 1) - badgeR,
                    right: w / 2 * (kX + 1) + badgeR
                },
                topLeft: {
                    top: w / 2 * (1 - kY) + badgeR,
                    right: w / 2 * (kX + 1) + badgeR
                },
                topRight: {
                    top: w / 2 * (1 - kY) + badgeR,
                    right: w / 2 * (1 - kX) - badgeR
                }
            };
            setCoordinates(coordinates_1[position]);
        }
    }, [children, badgeContent]);
    // -------------------------------------------------------------------------------------------------------------------
    var textClass = typeof children === 'string' || position === 'text' ? 'rf-badge--text' : '';
    var placeNearClass = placeNear ? 'rf-badge--near' : '';
    return (react_1.default.createElement("div", { className: "rf-badge__wrapper " + className + " " + placeNearClass, ref: wrapper },
        children,
        display &&
            react_1.default.createElement("div", { className: "rf-badge " + helpers_1.variantClass[variant] + " " + isDot + " " + textClass, style: coordinates }, badgeContent ? !isNaN(+badgeContent) && +badgeContent > max ? max + "+" : badgeContent : null)));
};
exports.default = Badge;
