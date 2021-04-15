import React from 'react';
var FormGroup = function (_a) {
    var label = _a.label, children = _a.children, errorMessage = _a.errorMessage, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.required, required = _c === void 0 ? false : _c;
    return (React.createElement("div", { className: "rf-form-group " + className + " " },
        React.createElement("div", { className: 'rf-form-group__inner' },
            label && (React.createElement("p", { className: 'rf-form-group__label' },
                label,
                required && React.createElement("span", { className: 'rf-form-group__required' }, "*"))),
            children),
        errorMessage && React.createElement("p", { className: 'rf-form-group__message' }, errorMessage)));
};
export default FormGroup;
