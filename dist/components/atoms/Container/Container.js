import React from 'react';
/** Компонент-обертка, ограничивает ширину контента */
var Container = function (_a) {
    var children = _a.children;
    return React.createElement("div", { className: 'container' }, children);
};
export default Container;
