import React, { useEffect, useState } from 'react';
import { FormGroup, PopupFooter, Textarea } from '../../../../index';
var Confirm = function (_a) {
    var comment = _a.comment, _b = _a.showComment, showComment = _b === void 0 ? false : _b, textAccept = _a.textAccept, onAction = _a.onAction, onClose = _a.onClose, text = _a.text;
    var handleSubmit = function () {
        onAction(state);
        onClose && onClose();
    };
    var _c = useState(''), state = _c[0], setState = _c[1];
    useEffect(function () {
        if (comment && showComment) {
            setState(comment);
        }
    }, [comment, showComment]);
    var onChange = function (e) {
        setState(e.target.value);
    };
    return (React.createElement("div", { className: 'confirm-popup' },
        React.createElement("h2", { className: 'confirm-popup__title' }, "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435"),
        text && React.createElement("p", { className: 'confirm-popup__text' }, text),
        showComment && (React.createElement(FormGroup, { label: '\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439' },
            React.createElement(Textarea, { value: state, onChange: onChange }))),
        React.createElement(PopupFooter, { onSubmit: handleSubmit, disabled: showComment && state === '', onClose: onClose, textAccept: textAccept })));
};
export default Confirm;
