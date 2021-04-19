"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var Structure = function (_a) {
    var _b = _a.departmentsPath, departmentsPath = _b === void 0 ? [] : _b;
    var departmentsPathJSX = departmentsPath.map(function (item) { return (react_1.default.createElement("div", { key: item.id, className: 'structure__item' },
        react_1.default.createElement("h4", { className: 'structure__unit' }, item.unitTypeDesc),
        react_1.default.createElement("p", { className: 'structure__name' }, item.name))); });
    // -------------------------------------------------------------------------------------------------------------------
    return (react_1.default.createElement("div", { className: 'structure' }, departmentsPathJSX));
};
exports.default = Structure;
