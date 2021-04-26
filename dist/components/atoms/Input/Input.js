"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var search_1 = __importDefault(require("../../_icons/search"));
var close_1 = __importDefault(require("../../_icons/close"));
var hide_1 = __importDefault(require("../../_icons/hide"));
var show_1 = __importDefault(require("../../_icons/show"));
var helpers_1 = require("../../../utils/helpers");
var Input = function (_a) {
    var _b, _c;
    var onClear = _a.onClear, _d = _a.debounce, debounce = _d === void 0 ? 300 : _d, _e = _a.search, search = _e === void 0 ? false : _e, floatLabel = _a.floatLabel, getValue = _a.getValue, _f = _a.size, size = _f === void 0 ? 'medium' : _f, props = __rest(_a, ["onClear", "debounce", "search", "floatLabel", "getValue", "size"]);
    /** Ref */
    var ref = react_1.useRef(null);
    /** Хук для плавающего лейбла */
    var _g = react_1.useState(''), floatClass = _g[0], setFloatClass = _g[1];
    /** Иконка показать/скрыть пароль */
    var _h = react_1.useState(false), showPassword = _h[0], setShowPassword = _h[1];
    /** Значение поля */
    var _j = react_1.useState(((_b = props.defaultValue) === null || _b === void 0 ? void 0 : _b.toString()) || ((_c = props.value) === null || _c === void 0 ? void 0 : _c.toString()) || ''), value = _j[0], setValue = _j[1];
    // ------------------------------------------------------------------------------------------------------------------
    react_1.useEffect(function () {
        /** Подписываемся на ввод текста */
        var sub;
        if (ref.current) {
            sub = rxjs_1.fromEvent(ref.current, 'keyup')
                .pipe(operators_1.map(function (e) { return e; }), operators_1.debounceTime(debounce), operators_1.distinctUntilChanged())
                .subscribe(function (e) {
                setValue(e.target.value);
                props.onKeyUp && props.onKeyUp(e);
                getValue && getValue(e.target.value);
            });
        }
        return function () {
            try {
                sub && sub.unsubscribe();
            }
            catch (e) {
                console.log(e);
            }
        };
    }, [
        onClear,
        debounce,
        props.onKeyUp,
        search
    ]);
    // ------------------------------------------------------------------------------------------------------------------
    /** Очистка поля ввода и сброс результатов поиска */
    var clearInput = function () {
        if (ref.current) {
            ref.current.value = '';
            setValue('');
            onClear && onClear();
            floatLabel && setFloatClass('');
        }
    };
    /** Кнопка поиска и сброса */
    var closeButton = onClear && value.length > 0 && (react_1.default.createElement("button", { className: 'rf-input__action rf-input__action-clear', onClick: clearInput },
        react_1.default.createElement(close_1.default, null)));
    /** Кнопка поиска */
    var searchButton = search && value.length === 0 && (react_1.default.createElement("button", { className: 'rf-input__action rf-input__action-search' },
        react_1.default.createElement(search_1.default, null)));
    // ------------------------------------------------------------------------------------------------------------------
    /** Показать пароль, если type="password" */
    var togglePassword = function () {
        if (ref.current) {
            setShowPassword(!showPassword);
            ref.current.type = ref.current.type === 'text' ? 'password' : 'text';
        }
    };
    /** Кнопка отображения пароля */
    var showButton = props.type === 'password' && (react_1.default.createElement("button", { className: 'rf-input-action rf-password-action', type: 'button', onClick: togglePassword }, showPassword ? react_1.default.createElement(show_1.default, null) : react_1.default.createElement(hide_1.default, null)));
    // ------------------------------------------------------------------------------------------------------------------
    /** Плавающий лейбл */
    var labelText = floatLabel && react_1.default.createElement("label", { className: 'rf-input__label' }, floatLabel);
    /** Добавляем активный класс, если инпут заполнен */
    var handleFloatLabel = function () {
        if (floatLabel) {
            setFloatClass(ref.current && ref.current.value ? 'rf-active-float' : '');
        }
    };
    // ------------------------------------------------------------------------------------------------------------------
    var floatLabelClass = floatLabel ? 'rf-input__field--with-label' : '';
    var iconClass = search || onClear ? 'rf-input__with-icon' : '';
    return (react_1.default.createElement("div", { className: "rf-input " + (props.className || '') },
        react_1.default.createElement("input", __assign({}, props, { ref: ref, className: "rf-input__field " + floatLabelClass + " " + floatClass + " " + helpers_1.sizeClass[size] + " " + iconClass, autoComplete: 'off', type: props.type || 'text', onKeyUp: handleFloatLabel })),
        labelText,
        showButton,
        closeButton,
        searchButton));
};
exports.default = Input;
