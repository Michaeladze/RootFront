"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Button_1 = __importDefault(require("../../../atoms/Button"));
var UserPhoto_1 = __importDefault(require("../../atoms/UserPhoto"));
var index_1 = require("../../../../index");
var User = function (_a) {
    var _b = _a.actionsList, actionsList = _b === void 0 ? [] : _b, _c = _a.menuPosition, menuPosition = _c === void 0 ? 'right' : _c, user = _a.user, _d = _a.showName, showName = _d === void 0 ? true : _d, radius = _a.radius;
    var name = (user === null || user === void 0 ? void 0 : user.fullName) || (user === null || user === void 0 ? void 0 : user.firstName) + " " + (user === null || user === void 0 ? void 0 : user.lastName);
    return (react_1.default.createElement(react_1.default.Fragment, null, user && (react_1.default.createElement(index_1.Menu, { list: actionsList, position: menuPosition },
        react_1.default.createElement(Button_1.default, { className: 'app-header__user-button', buttonType: 'text' },
            react_1.default.createElement(UserPhoto_1.default, { url: user.photo, fullName: name, radius: radius }),
            showName && react_1.default.createElement("h4", { className: 'user__name' }, user.firstName))))));
};
exports.default = User;
