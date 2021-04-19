"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Button_1 = __importDefault(require("../../atoms/Button/Button"));
var ModalChild = function () {
    return (react_1.default.createElement("div", { className: 'rf-modal-child' },
        react_1.default.createElement("h1", { className: 'rf-modal-child__title' }, "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u043C\u043E\u0434\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043E\u043A\u043D\u0430"),
        react_1.default.createElement("p", { className: 'rf-modal-child__text' }, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vitae nunc sit amet lacus venenatis tincidunt ac in lorem. Pellentesque nec lectus nisl. Proin rutrum dapibus ante, non hendrerit arcu euismod eget. Aliquam aliquet pulvinar ante. Vivamus non diam purus. Maecenas sagittis est eu feugiat dignissim. Aenean lacinia ut mauris ac ultricies. Nullam at quam nec quam porta mattis ac sed lorem. Vestibulum sed ornare augue. Sed at tincidunt quam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed rutrum odio arcu, quis sodales augue ullamcorper at. Proin pulvinar odio sed metus feugiat, vel volutpat velit sollicitudin. Maecenas in cursus risus. Pellentesque quis auctor turpis. Pellentesque nec egestas elit."),
        react_1.default.createElement(Button_1.default, { buttonType: 'primary' }, "\u041A\u0430\u043A\u0430\u044F-\u0442\u043E \u043A\u043D\u043E\u043F\u043A\u0430")));
};
exports.default = ModalChild;
