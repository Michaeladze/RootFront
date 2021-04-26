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
var Button_1 = __importDefault(require("../Button"));
require("./RetryCountDown.scss");
var RetryCountDown = function (_a) {
    var time = _a.time, action = _a.action;
    var interval = react_1.useRef(null);
    var pointer = react_1.useRef(0);
    var _b = react_1.useState(time[pointer.current]), value = _b[0], setValue = _b[1];
    var _c = react_1.useState(false), disabled = _c[0], setDisabled = _c[1];
    var clearInterval = function () {
        interval.current && clearTimeout(interval.current);
    };
    var startInterval = react_1.useCallback(function () {
        interval.current = setTimeout(function tick() {
            setValue(function (c) { return c - 1; });
            interval.current = setTimeout(tick, 1000);
        }, 1000);
    }, [setValue]);
    react_1.useEffect(function () {
        startInterval();
        return function () {
            clearInterval();
        };
    }, [time]);
    react_1.useEffect(function () {
        if (value === 0) {
            clearInterval();
            if (pointer.current >= time.length - 1) {
                setValue(time[time.length - 1]);
            }
            else {
                pointer.current += 1;
                setValue(time[pointer.current]);
            }
            startInterval();
        }
    }, [value]);
    var onRetry = function () {
        clearInterval();
        pointer.current = 0;
        setValue(time[pointer.current]);
        startInterval();
        action && action();
        setDisabled(true);
        setTimeout(function () {
            setDisabled(false);
        }, 5000);
    };
    return (react_1.default.createElement("div", { className: 'retry-notification' },
        react_1.default.createElement("span", null,
            "\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u043E\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 ",
            value,
            " \u0441\u0435\u043A."),
        react_1.default.createElement(Button_1.default, { buttonType: 'primary', variant: 'info', size: 'small', onClick: onRetry, className: 'retry-now__button', disabled: disabled }, "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u0441\u0435\u0439\u0447\u0430\u0441")));
};
exports.default = RetryCountDown;
