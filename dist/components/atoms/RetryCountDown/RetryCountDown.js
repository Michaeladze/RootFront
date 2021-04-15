import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from '../Button';
var RetryCountDown = function (_a) {
    var time = _a.time, action = _a.action;
    var interval = useRef(null);
    var pointer = useRef(0);
    var _b = useState(time[pointer.current]), value = _b[0], setValue = _b[1];
    var _c = useState(false), disabled = _c[0], setDisabled = _c[1];
    var clearInterval = function () {
        interval.current && clearTimeout(interval.current);
    };
    var startInterval = useCallback(function () {
        interval.current = setTimeout(function tick() {
            setValue(function (c) { return c - 1; });
            interval.current = setTimeout(tick, 1000);
        }, 1000);
    }, [setValue]);
    useEffect(function () {
        startInterval();
        return function () {
            clearInterval();
        };
    }, [time]);
    useEffect(function () {
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
    return (React.createElement("div", { className: 'retry-notification' },
        React.createElement("span", null,
            "\u041F\u043E\u0432\u0442\u043E\u0440\u043D\u043E\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435 \u0447\u0435\u0440\u0435\u0437 ",
            value,
            " \u0441\u0435\u043A."),
        React.createElement(Button, { buttonType: 'primary', variant: 'info', size: 'small', onClick: onRetry, className: 'retry-now__button', disabled: disabled }, "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u0441\u0435\u0439\u0447\u0430\u0441")));
};
export default RetryCountDown;
