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
import React, { useEffect, useRef, useState } from 'react';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import SearchIcon from '../../_icons/search';
import CloseIcon from '../../_icons/close';
import HideIcon from '../../_icons/hide';
import ShowIcon from '../../_icons/show';
import { sizeClass } from '../../../utils/helpers';
var Input = function (_a) {
    var _b, _c;
    var onClear = _a.onClear, _d = _a.debounce, debounce = _d === void 0 ? 300 : _d, _e = _a.search, search = _e === void 0 ? false : _e, floatLabel = _a.floatLabel, getValue = _a.getValue, _f = _a.size, size = _f === void 0 ? 'medium' : _f, props = __rest(_a, ["onClear", "debounce", "search", "floatLabel", "getValue", "size"]);
    /** Ref */
    var ref = useRef(null);
    /** Хук для плавающего лейбла */
    var _g = useState(''), floatClass = _g[0], setFloatClass = _g[1];
    /** Иконка показать/скрыть пароль */
    var _h = useState(false), showPassword = _h[0], setShowPassword = _h[1];
    /** Значение поля */
    var _j = useState(((_b = props.defaultValue) === null || _b === void 0 ? void 0 : _b.toString()) || ((_c = props.value) === null || _c === void 0 ? void 0 : _c.toString()) || ''), value = _j[0], setValue = _j[1];
    // ------------------------------------------------------------------------------------------------------------------
    useEffect(function () {
        /** Подписываемся на ввод текста */
        var sub;
        if (ref.current) {
            sub = fromEvent(ref.current, 'keyup')
                .pipe(map(function (e) { return e; }), debounceTime(debounce), distinctUntilChanged())
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
    var closeButton = onClear && value.length > 0 && (React.createElement("button", { className: 'rf-input__action rf-input__action-clear', onClick: clearInput },
        React.createElement(CloseIcon, null)));
    /** Кнопка поиска */
    var searchButton = search && value.length === 0 && (React.createElement("button", { className: 'rf-input__action rf-input__action-search' },
        React.createElement(SearchIcon, null)));
    // ------------------------------------------------------------------------------------------------------------------
    /** Показать пароль, если type="password" */
    var togglePassword = function () {
        if (ref.current) {
            setShowPassword(!showPassword);
            ref.current.type = ref.current.type === 'text' ? 'password' : 'text';
        }
    };
    /** Кнопка отображения пароля */
    var showButton = props.type === 'password' && (React.createElement("button", { className: 'rf-input-action rf-password-action', type: 'button', onClick: togglePassword }, showPassword ? React.createElement(ShowIcon, null) : React.createElement(HideIcon, null)));
    // ------------------------------------------------------------------------------------------------------------------
    /** Плавающий лейбл */
    var labelText = floatLabel && React.createElement("label", { className: 'rf-input__label' }, floatLabel);
    /** Добавляем активный класс, если инпут заполнен */
    var handleFloatLabel = function () {
        if (floatLabel) {
            setFloatClass(ref.current && ref.current.value ? 'rf-active-float' : '');
        }
    };
    // ------------------------------------------------------------------------------------------------------------------
    var floatLabelClass = floatLabel ? 'rf-input__field--with-label' : '';
    var iconClass = search || onClear ? 'rf-input__with-icon' : '';
    return (React.createElement("div", { className: "rf-input " + (props.className || '') },
        React.createElement("input", __assign({}, props, { ref: ref, className: "rf-input__field " + floatLabelClass + " " + floatClass + " " + sizeClass[size] + " " + iconClass, autoComplete: 'off', type: props.type || 'text', onKeyUp: handleFloatLabel })),
        labelText,
        showButton,
        closeButton,
        searchButton));
};
export default Input;
