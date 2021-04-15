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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useEffect, useRef, useState } from 'react';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Notification from '../../atoms/Notification';
// ---------------------------------------------------------------------------------------------------------------------
/** Стэк уведомлений */
var notifications$$ = new BehaviorSubject([]);
/** Удалить уведомление */
export var removeNotification = function (id) {
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
/** Добавить уведомление */
export var sendNotification = function (message, delay) {
    if (delay === void 0) { delay = 4000; }
    if (notifications$$.closed || notifications$$.isStopped) {
        return;
    }
    var tmp = __spreadArray([], notifications$$.getValue());
    tmp.push(__assign(__assign({}, message), { id: message.id || Date.now() }));
    notifications$$.next(tmp);
    setTimeout(function () {
        removeNotification(message.id);
    }, delay);
};
var Notifications = function () {
    /** Флаг по которому оставновить подписку */
    var obstacle = useRef(new Subject());
    var _a = useState(null), sub = _a[0], setSub = _a[1];
    useEffect(function () {
        if (notifications$$.closed) {
            notifications$$ = new BehaviorSubject([]);
        }
        setSub(notifications$$);
    }, []);
    /** Список уведомлений */
    var _b = useState([]), notifications = _b[0], setNotifications = _b[1];
    // -------------------------------------------------------------------------------------------------------------------
    /** Подписываемся на список уведомлений */
    useEffect(function () {
        if (!sub || sub.closed) {
            return;
        }
        var until = obstacle.current;
        sub.pipe(takeUntil(until)).subscribe(function (data) {
            setNotifications(data);
        });
        return function () {
            until.next(true);
        };
    }, [sub]);
    // -------------------------------------------------------------------------------------------------------------------
    /** Список уведомлений TSX */
    var list = notifications.map(function (n, i) { return (React.createElement(Notification, { key: n.id || i, item: n, remove: removeNotification })); });
    // -------------------------------------------------------------------------------------------------------------------
    return React.createElement("div", { className: 'rf-notifications__list' }, list);
};
export default Notifications;
