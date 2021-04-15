import React from 'react';
var FormGroupInline = function (_a) {
    var children = _a.children, className = _a.className, errorMessage = _a.errorMessage, label = _a.label, required = _a.required;
    return (React.createElement("div", { className: "rf-inline-group " + className },
        React.createElement("div", { className: 'rf-inline-group__inner' },
            label && (React.createElement("p", { className: 'rf-inline-group__label' },
                label,
                " ",
                required && React.createElement("span", { className: 'rf-inline-group__required' }, "*"))),
            children),
        errorMessage && React.createElement("p", { className: 'rf-inline-group__message' }, errorMessage)));
};
export default FormGroupInline;
