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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./Textarea.scss");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var Textarea = function (_a) {
    var _b, _c;
    var _d = _a.autoResize, autoResize = _d === void 0 ? false : _d, _e = _a.initialRowCount, initialRowCount = _e === void 0 ? 3 : _e, _f = _a.debounce, debounce = _f === void 0 ? 300 : _f, getValue = _a.getValue, props = __rest(_a, ["autoResize", "initialRowCount", "debounce", "getValue"]);
    /** Ссылка на поле */
    var textarea = react_1.useRef(null);
    /** Количество рядов */
    var _g = react_1.useState(initialRowCount), rows = _g[0], setRows = _g[1];
    var _h = react_1.useState(((_b = props.defaultValue) === null || _b === void 0 ? void 0 : _b.toString()) || ((_c = props.value) === null || _c === void 0 ? void 0 : _c.toString()) || ''), value = _h[0], setValue = _h[1];
    react_1.useEffect(function () {
        /** При фокусе на поле раскрываем его */
        if (textarea.current && autoResize) {
            setRows(textarea.current.value.split('\n').length + 1);
        }
        /** Подписываемся на ввод текста */
        var sub;
        if (textarea.current) {
            sub = rxjs_1.fromEvent(textarea.current, 'keyup')
                .pipe(operators_1.map(function (e) { return e; }), operators_1.debounceTime(debounce), operators_1.distinctUntilChanged())
                .subscribe(function (e) {
                if (textarea.current) {
                    if (autoResize) {
                        setRows(textarea.current.value.split('\n').length + 1);
                    }
                    if (props.maxLength) {
                        setValue(textarea.current.value);
                    }
                    getValue && getValue(textarea.current.value);
                }
                props.onKeyUp && props.onKeyUp(e);
            });
        }
        return function () {
            try {
                autoResize && sub && sub.unsubscribe();
            }
            catch (e) {
                console.log(e);
            }
        };
    }, []);
    return (react_1.default.createElement("div", { className: "rf-textarea__wrapper " + props.className },
        react_1.default.createElement("textarea", __assign({}, props, { ref: textarea, rows: rows, className: 'rf-textarea-field', autoComplete: 'off' })),
        props.maxLength && props.maxLength > 0 && (react_1.default.createElement("p", { className: 'rf-textarea__max-length' },
            value.length,
            " / ",
            props.maxLength))));
};
exports.default = Textarea;
