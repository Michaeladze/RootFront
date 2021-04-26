"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./StoryItem.scss");
var StoryItem = function (_a) {
    var subtitle = _a.subtitle, description = _a.description, children = _a.children;
    return (react_1.default.createElement("div", { className: 'story__item' },
        subtitle && react_1.default.createElement("h4", { className: 'story__subtitle' }, subtitle),
        description && react_1.default.createElement("p", { className: 'story__description' }, description),
        react_1.default.createElement("div", { className: 'story__content' }, children)));
};
exports.default = StoryItem;
