import React, { useState } from 'react';
import Angle from '../../_icons/angle-down';
var ContentExpander = function (_a) {
    var title = _a.title, children = _a.children, onExpand = _a.onExpand, expanded = _a.expanded, _b = _a.defaultValue, defaultValue = _b === void 0 ? false : _b, _c = _a.className, className = _c === void 0 ? '' : _c, _d = _a.disabled, disabled = _d === void 0 ? false : _d, _e = _a.stickArrow, stickArrow = _e === void 0 ? false : _e;
    /** Раскрыть / Скрыть */
    var _f = useState(defaultValue), innerExpanded = _f[0], setInnerExpanded = _f[1];
    var onClick = function () {
        if (disabled) {
            return;
        }
        onExpand ? onExpand() : setInnerExpanded(!innerExpanded);
    };
    var disabledClass = disabled ? 'expander--disabled' : '';
    var stickArrowClass = stickArrow ? 'expander--arrow-stick' : '';
    return (React.createElement("div", { className: "expander " + className + " " + stickArrowClass + " " + disabledClass },
        React.createElement("h3", { className: 'expander__title', onClick: onClick },
            React.createElement("span", { className: 'expander__title-text' }, title),
            React.createElement(Angle, { className: "expander__icon " + (expanded || innerExpanded ? 'expander__icon--rotate' : '') })),
        React.createElement("div", { className: "expander__content " + (onExpand || innerExpanded ? 'expander__content--active' : '') }, children)));
};
export default ContentExpander;
