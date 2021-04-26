"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./FatalError.scss");
var FatalErrorIcon_1 = __importDefault(require("./FatalErrorIcon"));
var FatalError = function () {
    // -------------------------------------------------------------------------------------------------------------------
    return (react_1.default.createElement("div", { className: 'fatal-error' },
        react_1.default.createElement(FatalErrorIcon_1.default, null),
        react_1.default.createElement("p", { className: 'fatal-error__label' }, "\u0427\u0442\u043E-\u0442\u043E \u043F\u043E\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A... \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043E\u0431\u043D\u043E\u0432\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0443."),
        react_1.default.createElement("p", { className: 'fatal-error__message' },
            "\u0414\u043B\u044F \u0437\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u0438\u043D\u0446\u0438\u0434\u0435\u043D\u0442\u0430 \u0432\u043E\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435\u0441\u044C \u0426\u0421\u041F\u041F (",
            react_1.default.createElement("a", { href: 'https://cspp.vtb.ru', target: '_blank', className: 'fatal-error__link' }, "https://cspp.vtb.ru"),
            ").")));
};
exports.default = FatalError;
