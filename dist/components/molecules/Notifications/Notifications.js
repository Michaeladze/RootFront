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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = exports.removeNotification = void 0;
var react_1 = __importStar(require("react"));
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var Notification_1 = __importDefault(require("../../atoms/Notification"));
require("./Notifications.scss");
// ---------------------------------------------------------------------------------------------------------------------
/** Стэк уведомлений */
var notifications$$ = new rxjs_1.BehaviorSubject([]);
/** Удалить уведомление */
var removeNotification = function (id) {
    if (notifications$$.closed || notifications$$.isStopped) {
        return;
    }
    var tmp = __spreadArray([], notifications$$.getValue());
    if (tmp.length > 0) {
        if (id !== undefined) {
            tmp = tmp.filter(function (n) { return n.id !== id; });
        }
        else {
            tmp.shift();
        }
        notifications$$.next(tmp);
    }
};
exports.removeNotification = removeNotification;
/** Добавить уведомление */
var sendNotification = function (message, delay) {
    if (delay === void 0) { delay = 4000; }
    if (notifications$$.closed || notifications$$.isStopped) {
        return;
    }
    var tmp = __spreadArray([], notifications$$.getValue());
    tmp.push(__assign(__assign({}, message), { id: message.id || Date.now() }));
    notifications$$.next(tmp);
    setTimeout(function () {
        exports.removeNotification(message.id);
    }, delay);
};
exports.sendNotification = sendNotification;
var Notifications = function () {
    /** Флаг по которому оставновить подписку */
    var obstacle = react_1.useRef(new rxjs_1.Subject());
    var _a = react_1.useState(null), sub = _a[0], setSub = _a[1];
    react_1.useEffect(function () {
        if (notifications$$.closed) {
            notifications$$ = new rxjs_1.BehaviorSubject([]);
        }
        setSub(notifications$$);
    }, []);
    /** Список уведомлений */
    var _b = react_1.useState([]), notifications = _b[0], setNotifications = _b[1];
    // -------------------------------------------------------------------------------------------------------------------
    /** Подписываемся на список уведомлений */
    react_1.useEffect(function () {
        if (!sub || sub.closed) {
            return;
        }
        var until = obstacle.current;
        sub.pipe(operators_1.takeUntil(until)).subscribe(function (data) {
            setNotifications(data);
        });
        return function () {
            until.next(true);
        };
    }, [sub]);
    // -------------------------------------------------------------------------------------------------------------------
    /** Список уведомлений TSX */
    var list = notifications.map(function (n, i) { return (react_1.default.createElement(Notification_1.default, { key: n.id || i, item: n, remove: exports.removeNotification })); });
    // -------------------------------------------------------------------------------------------------------------------
    return react_1.default.createElement("div", { className: 'rf-notifications__list' }, list);
};
exports.default = Notifications;
