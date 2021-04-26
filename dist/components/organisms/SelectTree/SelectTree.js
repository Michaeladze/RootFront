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
var treeHelpers_1 = require("../../../utils/treeHelpers");
var SelectTree = function (_a) {
    var list = _a.list, open = _a.open, onChange = _a.onChange, _b = _a.multiple, multiple = _b === void 0 ? true : _b, activeOption = _a.activeOption;
    var _c = react_1.useState([]), state = _c[0], setState = _c[1];
    var _d = react_1.useState(activeOption), activeItem = _d[0], setActiveItem = _d[1];
    react_1.useEffect(function () {
        setActiveItem(activeOption);
    }, [activeOption]);
    // ---------------------------------------------------------------------------------------------------------------------------------------
    /** Рекурсивно определяем, какие чекбоксы нужно чекнуть/хафчекнуть по дефолту */
    react_1.useEffect(function () {
        var recursiveCheck = function (list, parent) {
            if (!list) {
                return;
            }
            for (var i = 0; i < list.length; i++) {
                list[i].parent = parent;
                if (list[i].checked) {
                    changeParentsFlags(list[i]);
                    changeChildrenFlags(true, list[i].children);
                    continue;
                }
                recursiveCheck(list[i].children, list[i]);
            }
        };
        recursiveCheck(list);
        setState(list);
    }, [list]);
    // ---------------------------------------------------------------------------------------------------------------------------------------
    /** Изменяем флаги, поднимаясь вверх по дереву */
    var changeParentsFlags = function (item) {
        var parent = item.parent;
        if (parent && parent.children) {
            var checkedChildren = parent.children.filter(function (o) { return o.checked; });
            parent.checked = checkedChildren.length === parent.children.length;
            parent.hasCheckedChild = (checkedChildren.length !== parent.children.length && checkedChildren.length > 0) || !!item.hasCheckedChild;
            changeParentsFlags(parent);
        }
    };
    /** Изменяем флаги, спускаясь вниз по дереву */
    var changeChildrenFlags = function (flag, items) {
        if (items) {
            items.forEach(function (o) {
                o.checked = flag;
                o.hasCheckedChild = false;
                changeChildrenFlags(flag, o.children);
            });
        }
    };
    // ---------------------------------------------------------------------------------------------------------------------------------------
    /** Основная функция изменения состояния компонента */
    var handleChange = function (flag, item) {
        if (multiple) {
            item.checked = flag;
            changeParentsFlags(item);
            changeChildrenFlags(flag, item.children);
        }
        treeHelpers_1.clearRecursion(state);
        var result = JSON.parse(JSON.stringify(state));
        if (!multiple) {
            setActiveItem(item);
        }
        onChange && onChange(item, result);
        setState(result);
    };
    // ---------------------------------------------------------------------------------------------------------------------------------------
    return (react_1.default.createElement(Folder_1.default, { list: state, onChange: handleChange, open: !!open, multiple: multiple, activeItem: activeItem }));
};
exports.default = SelectTree;
