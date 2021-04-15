import React from 'react';
var Tile = function (_a) {
    var children = _a.children, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.type, type = _c === void 0 ? 'default' : _c;
    var stretchClass = type === 'stretch' ? 'rf-tile--stretch' : '';
    return React.createElement("div", { className: "rf-tile " + stretchClass + " " + className }, children);
};
export default Tile;
