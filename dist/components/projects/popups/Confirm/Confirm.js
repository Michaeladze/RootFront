"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var index_1 = require("../../../../index");
require("./Confirm.scss");
var Confirm = function (_a) {
    var comment = _a.comment, _b = _a.showComment, showComment = _b === void 0 ? false : _b, textAccept = _a.textAccept, onAction = _a.onAction, onClose = _a.onClose, text = _a.text;
    var handleSubmit = function () {
        onAction(state);
        onClose && onClose();
    };
    var _c = react_1.useState(''), state = _c[0], setState = _c[1];
    react_1.useEffect(function () {
        if (comment && showComment) {
            setState(comment);
        }
    }, [comment, showComment]);
    var onChange = function (e) {
        setState(e.target.value);
    };
    return (react_1.default.createElement("div", { className: 'confirm-popup' },
        react_1.default.createElement("h2", { className: 'confirm-popup__title' }, "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435"),
        text && react_1.default.createElement("p", { className: 'confirm-popup__text' }, text),
        showComment && (react_1.default.createElement(index_1.FormGroup, { label: '\u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439' },
            react_1.default.createElement(index_1.Textarea, { value: state, onChange: onChange }))),
        react_1.default.createElement(index_1.PopupFooter, { onSubmit: handleSubmit, disabled: showComment && state === '', onClose: onClose, textAccept: textAccept })));
};
exports.default = Confirm;
