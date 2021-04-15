import React, { useContext, useEffect, useMemo, useState } from 'react';
import { arrayTimeHours, arrayTimeMinutes } from './timeData';
import Button from '../Button';
import Arrow from '../../_icons/angle-down';
import { MenuContext } from '../../molecules/Menu/Menu';
var TimeElement = function (_a) {
    var updateTime = _a.updateTime, min = _a.min, max = _a.max, value = _a.value;
    var _b = useState(null), time = _b[0], setTime = _b[1];
    var _c = useState(false), translate = _c[0], setTranslate = _c[1];
    useEffect(function () {
        if (value) {
            setTime(value.split(':')[0]);
        }
    }, [value]);
    var clickHandler = function (event) {
        setTime(event.currentTarget.innerText.split(':')[0]);
        setTranslate(true);
    };
    var applyTimeHandler = function (event, onClose) {
        updateTime(event.currentTarget.innerText);
        setTranslate(false);
        onClose();
    };
    // -------------------------------------------------------------------------------------------------------------------
    var minH = useMemo(function () { return min.split(':'); }, [min])[0];
    var maxH = useMemo(function () { return max.split(':'); }, [max])[0];
    /** Сравнение времени */
    var isValidTime = function (time, flag) {
        var _a = time.split(':'), h = _a[0], m = _a[1];
        if (flag === 'h') {
            return h >= minH && h <= maxH;
        }
        var cur = h + m;
        var minStr = min.replace(':', '');
        var maxStr = max.replace(':', '');
        return cur >= minStr && cur <= maxStr;
    };
    // -------------------------------------------------------------------------------------------------------------------
    /** Ячейки с часами */
    var itemsHour = arrayTimeHours.map(function (itemRow, id) { return (React.createElement("div", { key: id, className: 'rf-time-element__item-row' }, itemRow.map(function (item) { return (React.createElement(Button, { buttonType: 'text', key: item, disabled: !isValidTime(item, 'h'), className: 'rf-time-element', onClick: clickHandler }, item)); }))); });
    var onClose = useContext(MenuContext).onClose;
    /** Ячейки с минутами */
    var itemsMinutes = arrayTimeMinutes.map(function (itemRow, id) { return (React.createElement("div", { key: id, className: 'rf-time-element__item-row' }, itemRow.map(function (item) {
        var t = (time || '00') + item;
        return (React.createElement(Button, { buttonType: 'text', key: item, disabled: !isValidTime(t, 'm'), className: 'rf-time-element', onClick: function (e) { return applyTimeHandler(e, onClose); } }, t));
    }))); });
    return (React.createElement("div", { className: 'rf-time-element__wrapper' },
        React.createElement("div", { className: "rf-time-element__translate " + (translate ? 'element__translate--active' : '') },
            React.createElement("div", { className: 'rf-time-element__column' },
                React.createElement("div", { className: 'rf-time-element__header-container' },
                    React.createElement("div", { className: 'rf-time-element__name' }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0447\u0430\u0441")),
                itemsHour),
            React.createElement("div", { className: 'rf-time-element__column' },
                React.createElement("div", { className: 'rf-time-element__header-container' },
                    React.createElement(Button, { style: { paddingRight: '4px' }, onClick: function () { return setTranslate(false); }, buttonType: 'text' },
                        React.createElement(Arrow, { className: 'rf-time-element__icon' })),
                    React.createElement("div", { className: 'rf-time-element__name' }, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043C\u0438\u043D\u0443\u0442\u044B")),
                itemsMinutes))));
};
export default TimeElement;
