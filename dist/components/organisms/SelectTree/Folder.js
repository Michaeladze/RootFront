"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var FolderItem_1 = __importDefault(require("./FolderItem"));
var Folder = function (_a) {
    // ---------------------------------------------------------------------------------------------------------------------------------------
    var list = _a.list, onChange = _a.onChange, parent = _a.parent, _b = _a.depth, depth = _b === void 0 ? 0 : _b, open = _a.open, multiple = _a.multiple, activeItem = _a.activeItem;
    /** Базовый размер отступа слева */
    var PADDING_LEFT_BASE = (parent === null || parent === void 0 ? void 0 : parent.disabled) ? 16 : 36;
    var style = { paddingLeft: depth === 0 ? 0 : PADDING_LEFT_BASE };
    // ---------------------------------------------------------------------------------------------------------------------------------------
    var listJSX = list.map(function (item) {
        item.parent = parent;
        return (react_1.default.createElement(FolderItem_1.default, { key: item.value, item: item, onChange: onChange, depth: depth + 1, open: open, multiple: multiple, activeItem: activeItem }));
    });
    // ---------------------------------------------------------------------------------------------------------------------------------------
    return (react_1.default.createElement("div", { className: 'rf-folder', style: style }, listJSX));
};
exports.default = Folder;
