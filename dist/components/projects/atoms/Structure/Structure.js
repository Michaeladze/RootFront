import React from 'react';
var Structure = function (_a) {
    var _b = _a.departmentsPath, departmentsPath = _b === void 0 ? [] : _b;
    var departmentsPathJSX = departmentsPath.map(function (item) { return (React.createElement("div", { key: item.id, className: 'structure__item' },
        React.createElement("h4", { className: 'structure__unit' }, item.unitTypeDesc),
        React.createElement("p", { className: 'structure__name' }, item.name))); });
    // -------------------------------------------------------------------------------------------------------------------
    return (React.createElement("div", { className: 'structure' }, departmentsPathJSX));
};
export default Structure;
