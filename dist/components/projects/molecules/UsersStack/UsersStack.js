"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var index_1 = require("../../../../index");
require("./UsersStack.scss");
var UsersStack = function (_a) {
    var users = _a.users, radius = _a.radius;
    var LIMIT = 3;
    var slicedUsers = users.filter(function (_, i) { return i < LIMIT; });
    var usersJSX = slicedUsers.map(function (u, i) { return (react_1.default.createElement("div", { className: 'users-stack__item', key: u.id, style: {
            transform: "translateX(-" + 16 * i + "px)",
            zIndex: users.length - i
        } },
        react_1.default.createElement(index_1.UserPhoto, { url: u.photo, fullName: u.fullName, radius: radius }))); });
    return (react_1.default.createElement("div", { className: 'users-stack' },
        usersJSX,
        LIMIT < users.length && react_1.default.createElement("span", { className: 'users-stack__value' },
            "+",
            users.length - LIMIT)));
};
exports.default = UsersStack;
