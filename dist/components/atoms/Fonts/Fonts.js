"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Button_1 = __importDefault(require("../Button"));
require("./Fonts.scss");
var Fonts = function () {
    return (react_1.default.createElement("div", { className: 'rf-fonts' },
        react_1.default.createElement("div", { className: 'rf-fonts__col' },
            react_1.default.createElement("h3", { className: 'rf-fonts__col-title' }, "\u0422\u0435\u043A\u0441\u0442\u044B"),
            react_1.default.createElement("h1", { className: 'rf-fonts__item rf-h1' }, "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 1"),
            react_1.default.createElement("h2", { className: 'rf-fonts__item rf-h2' }, "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 2"),
            react_1.default.createElement("h3", { className: 'rf-fonts__item rf-h3' }, "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 3"),
            react_1.default.createElement("h4", { className: 'rf-fonts__item rf-h4' }, "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 4"),
            react_1.default.createElement("h5", { className: 'rf-fonts__item rf-h5' }, "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 5"),
            react_1.default.createElement("h6", { className: 'rf-fonts__item rf-h6' }, "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 6"),
            react_1.default.createElement("p", { className: 'rf-fonts__item rf-s1' }, "\u041F\u043E\u0434\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 1"),
            react_1.default.createElement("p", { className: 'rf-fonts__item rf-s2' }, "\u041F\u043E\u0434\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A 2"),
            react_1.default.createElement("p", { className: 'rf-fonts__item rf-p1' }, "\u041F\u0430\u0440\u0430\u0433\u0440\u0430\u0444 1"),
            react_1.default.createElement("p", { className: 'rf-fonts__item rf-p2' }, "\u041F\u0430\u0440\u0430\u0433\u0440\u0430\u0444 2"),
            react_1.default.createElement("p", { className: 'rf-fonts__item rf-c1' }, "\u041F\u043E\u0434\u043F\u0438\u0441\u044C 1"),
            react_1.default.createElement("p", { className: 'rf-fonts__item rf-c2' }, "\u041F\u043E\u0434\u043F\u0438\u0441\u044C 2"),
            react_1.default.createElement("p", { className: 'rf-fonts__item rf-l' }, "\u041B\u0435\u0439\u0431\u043B")),
        react_1.default.createElement("div", { className: 'rf-fonts__col' },
            react_1.default.createElement("h3", { className: 'rf-fonts__col-title' }, "\u041A\u043D\u043E\u043F\u043A\u0438"),
            react_1.default.createElement(Button_1.default, { buttonType: 'link', className: 'rf-fonts__item rf-button-giant' }, "\u0413\u0438\u0433\u0430\u043D\u0442\u0441\u043A\u0438\u0439"),
            react_1.default.createElement(Button_1.default, { buttonType: 'link', className: 'rf-fonts__item rf-button-large' }, "\u0411\u043E\u043B\u044C\u0448\u043E\u0439"),
            react_1.default.createElement(Button_1.default, { buttonType: 'link', className: 'rf-fonts__item rf-button-medium' }, "\u0421\u0440\u0435\u0434\u043D\u0438\u0439"),
            react_1.default.createElement(Button_1.default, { buttonType: 'link', className: 'rf-fonts__item rf-button-small' }, "\u041C\u0430\u043B\u0435\u043D\u044C\u043A\u0438\u0439"),
            react_1.default.createElement(Button_1.default, { buttonType: 'link', className: 'rf-fonts__item rf-button-tiny' }, "\u041A\u0440\u043E\u0448\u0435\u0447\u043D\u044B\u0439"))));
};
exports.default = Fonts;
