import React from 'react';
import { variantClass } from '../../../utils/helpers';
var Message = function (_a) {
    var children = _a.children, _b = _a.variant, variant = _b === void 0 ? 'info' : _b, _c = _a.className, className = _c === void 0 ? '' : _c;
    return (React.createElement("div", { className: "rf-message " + variantClass[variant] + " " + className },
        React.createElement("div", { className: 'rf-message__message' }, children)));
};
export default Message;
