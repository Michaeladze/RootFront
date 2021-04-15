import React, { useState, useEffect } from 'react';
import { variantClass } from '../../../utils/helpers';
var Switch = function (_a) {
    var label = _a.label, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.state, state = _c === void 0 ? false : _c, _d = _a.disable, disable = _d === void 0 ? false : _d, onChange = _a.onChange, _e = _a.variant, variant = _e === void 0 ? 'accent' : _e;
    var _f = useState(state), s = _f[0], toggle = _f[1];
    useEffect(function () {
        toggle(state);
    }, [state]);
    var changeState = function () {
        if (!disable) {
            onChange && onChange(!s);
            toggle(!s);
        }
    };
    return (React.createElement("div", { className: "rf-switch " + (disable ? 'rf-switch--disable' : '') + " " + className, onClick: changeState },
        React.createElement("div", { className: "rf-switch__toggle " + (s ? 'on' : 'off') + " " + variantClass[variant] },
            React.createElement("div", { className: 'rf-switch__circle' })),
        label && React.createElement("p", { className: 'rf-switch__label' }, label)));
};
export default Switch;
