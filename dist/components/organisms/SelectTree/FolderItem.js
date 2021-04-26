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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var Folder_1 = __importDefault(require("./Folder"));
var angle_down_1 = __importDefault(require("../../_icons/angle-down"));
var index_1 = require("../../../index");
var FolderItem = function (_a) {
    var item = _a.item, onChange = _a.onChange, depth = _a.depth, open = _a.open, multiple = _a.multiple, activeItem = _a.activeItem;
    var _b = react_1.useState(open), showFolder = _b[0], toggleFolder = _b[1];
    react_1.useEffect(function () {
        toggleFolder(open);
    }, [open]);
    // ---------------------------------------------------------------------------------------------------------------------------------------
    var openClass = showFolder && item.children ? 'rf-folder__item--open' : 'rf-folder__item--close';
    var showFolderClass = showFolder ? '' : 'rf-folder__item-folder--hidden';
    var rotateIconClass = showFolder ? '' : 'rf-folder__item-label-icon--rotate';
    var showIconClass = item.children && item.children.length > 0 ? '' : 'rf-folder__item-label-icon--hidden';
    var itemChildrenClass = item.children ? '' : 'rf-folder__item--no-children';
    var activeClass = (activeItem === null || activeItem === void 0 ? void 0 : activeItem.value) === item.value && !multiple ? 'rf-folder__item--active' : '';
    // ---------------------------------------------------------------------------------------------------------------------------------------
    var handleChange = function (e) {
        if (multiple) {
            item.checked = e.target.checked;
            item.hasCheckedChild = false;
        }
        onChange(e.target.checked, item);
    };
    // ---------------------------------------------------------------------------------------------------------------------------------------
    return (react_1.default.createElement("div", { className: "rf-folder__item " + openClass + " " + itemChildrenClass + " " + activeClass },
        react_1.default.createElement("div", { className: 'rf-folder__item-label', onClick: function () { return toggleFolder(!showFolder); } },
            react_1.default.createElement(angle_down_1.default, { className: "rf-folder__item-label-icon " + rotateIconClass + " " + showIconClass }),
            multiple ? (react_1.default.createElement(index_1.Checkbox, { label: item.label, value: item.value, disabled: item.disabled, icon: !item.disabled, checked: item.checked, halfChecked: item.hasCheckedChild, onChange: handleChange })) : (react_1.default.createElement(index_1.Radio, { name: 'select-tree_unique-name', label: item.label, value: item.value, disabled: item.disabled, icon: !item.disabled, checked: (activeItem === null || activeItem === void 0 ? void 0 : activeItem.value) === item.value || item.checked, onChange: handleChange }))),
        item.children && item.children.length > 0 && (react_1.default.createElement("div", { className: "rf-folder__item-folder " + showFolderClass },
            react_1.default.createElement(Folder_1.default, { list: item.children, onChange: onChange, parent: item, depth: depth, open: open, multiple: multiple, activeItem: activeItem })))));
};
exports.default = FolderItem;
