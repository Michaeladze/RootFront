"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./Story.scss");
var Story = function (_a) {
    var name = _a.name, description = _a.description, width = _a.width, height = _a.height, children = _a.children;
    var style = {
        width: width ? width + "px" : '100%',
        height: height ? height + "px" : '100%'
    };
    return (react_1.default.createElement("div", { className: 'story', style: style },
        react_1.default.createElement("h2", { className: 'story__name' }, name),
        description && react_1.default.createElement("p", { className: 'story__description' }, description),
        react_1.default.createElement("div", { className: 'story__wrapper' }, children)));
};
exports.default = Story;
