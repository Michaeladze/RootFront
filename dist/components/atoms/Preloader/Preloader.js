import React from 'react';
import { sizeClass, variantClass } from '../../../utils/helpers';
var Preloader = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.size, size = _c === void 0 ? 'medium' : _c, _d = _a.variant, variant = _d === void 0 ? 'accent' : _d;
    return (React.createElement("div", { className: "preloader " + sizeClass[size] + " " + variantClass[variant] + " " + className },
        React.createElement("div", { className: 'preloader__circle' })));
};
export default Preloader;
