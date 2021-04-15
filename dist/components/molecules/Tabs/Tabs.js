import React, { createRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
var Tabs = function (_a) {
    var list = _a.list, _b = _a.type, type = _b === void 0 ? 'underline' : _b, children = _a.children;
    var history = useHistory();
    var pathname = useLocation().pathname;
    /** Ссылки на вкладки */
    var refs = useRef([]);
    /** Ссылка на линию */
    var lineRef = useRef(null);
    /** Определяем, если вкладки являются ссылками для роутинга */
    var isRouting = useMemo(function () { return list.every(function (t) { return t.url; }); }, [list]);
    // -------------------------------------------------------------------------------------------------------------------
    /** Управление полоской */
    var setLinePosition = function (element) {
        if (lineRef.current) {
            var width = element.offsetWidth;
            var x = element.offsetLeft;
            lineRef.current.style.left = x + "px";
            lineRef.current.style.width = width + "px";
        }
    };
    // -------------------------------------------------------------------------------------------------------------------
    /** Определяем активную вкладку */
    var _c = useState(0), active = _c[0], setActive = _c[1];
    useEffect(function () {
        var index = list.findIndex(function (t) { return (isRouting ? t.url === pathname : t.active); });
        setActive(index >= 0 && !list[index].disabled ? index : 0);
    }, [list, pathname]);
    /** Устанавливаем активную вкладку */
    var onClick = function (e, i, element) {
        element && setLinePosition(element);
        if (isRouting && list[i].url) {
            history.push(list[i].url);
        }
        setActive(i);
    };
    // -------------------------------------------------------------------------------------------------------------------
    /** Список вкладок */
    var nav = list.map(function (t, i) {
        if (!refs.current[i]) {
            refs.current[i] = createRef();
        }
        var className = "" + (i === active ? 'rf-tabs__button--active' : '');
        var handler = function (e) { return onClick(e, i, refs.current[i].current); };
        return (React.createElement("div", { key: i, className: 'rf-tabs__link', ref: refs.current[i] },
            React.createElement("button", { className: "rf-tabs__button " + className, disabled: t.disabled, onClick: handler }, t.label)));
    });
    /** Устанавливаем линию на активную вкладку при инициализации */
    useLayoutEffect(function () {
        if (nav.length > 0 && refs.current[active].current) {
            var element = refs.current[active].current;
            element && setLinePosition(element);
        }
    }, [nav]);
    // -------------------------------------------------------------------------------------------------------------------
    var typeClass = type === 'buttons' ? 'rf-tabs--buttons' : '';
    return (React.createElement("div", { className: "rf-tabs " + typeClass },
        React.createElement("nav", { className: 'rf-tabs__navigation ' },
            React.createElement("div", { className: 'rf-tabs__navigation-list' }, nav),
            React.createElement("div", { className: 'rf-tabs__navigation-line', ref: lineRef })),
        ((isRouting && children) || (!isRouting && list.length > 0)) && (React.createElement("div", { className: 'rf-tabs__content' }, isRouting && children ? children : list[active].tab))));
};
export default Tabs;
