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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useClickOutside from '../../../hooks/useClickOutside';
import { Button, Checkbox, Input, Radio } from '../../../index';
import Angle from '../../_icons/caret-down';
import Close from '../../_icons/close';
import Chips from '../../molecules/Chips/Chips';
import { sizeClass } from '../../../utils/helpers';
var Select = function (_a) {
    var options = _a.options, _b = _a.multiSelect, multiSelect = _b === void 0 ? false : _b, value = _a.value, onChange = _a.onChange, getValue = _a.getValue, _c = _a.size, size = _c === void 0 ? 'medium' : _c, onChipsRemove = _a.onChipsRemove, props = __rest(_a, ["options", "multiSelect", "value", "onChange", "getValue", "size", "onChipsRemove"]);
    /** Ссылка на текущий компонент */
    var componentNode = useRef(null);
    // -------------------------------------------------------------------------------------------------------------------
    /** Отображение дропдауна с значениями */
    var _d = useState(false), showDropdown = _d[0], toggleDropdown = _d[1];
    var dropdownRef = useRef(null);
    /** При открытии выпадающего списка поднимаем скролл наверх */
    useEffect(function () {
        if (showDropdown && dropdownRef.current) {
            dropdownRef.current.scrollTop = 0;
        }
    }, [showDropdown]);
    // -------------------------------------------------------------------------------------------------------------------
    /** Отфильтрованные значения */
    var _e = useState(new Map()), hiddenOptions = _e[0], setHiddenOptions = _e[1];
    /** Функция фильтрации списка */
    var onFilter = function (options, search) {
        return options.reduce(function (acc, o) {
            if (!o.label.toLowerCase()
                .includes(search.toLowerCase())) {
                acc.set(o.value, true);
            }
            return acc;
        }, new Map());
    };
    /** Поиск внутри селекта */
    var onSearch = function (e) {
        if (props.readOnly) {
            return;
        }
        var result = new Map();
        var search = e.target.value;
        if (search) {
            result = onFilter(options, search);
        }
        /** Скрываем выпадающий список, если ничего не найдено */
        if (options.length === result.size) {
            showDropdown && toggleDropdown(false);
        }
        else {
            !showDropdown && toggleDropdown(true);
        }
        setHiddenOptions(result);
    };
    // -------------------------------------------------------------------------------------------------------------------
    /** Визуальное значение */
    var initInputValue = function () {
        if (typeof value === 'string') {
            if (multiSelect) {
                return '';
            }
            var tmp = options.find(function (o) { return o.value === value; });
            return (tmp === null || tmp === void 0 ? void 0 : tmp.label) || '';
        }
        return '';
    };
    var _f = useState(initInputValue()), inputValue = _f[0], setInputValue = _f[1];
    useEffect(function () {
        setInputValue(initInputValue());
    }, [value]);
    /** Текущее значение */
    var initCurrentValue = function () {
        if (Array.isArray(value)) {
            if (multiSelect && value.length !== 0) {
                return options.filter(function (o) { return value.includes(o.value); });
            }
            return [];
        }
        return options.filter(function (o) { return o.value === value; });
    };
    var _g = useState(initCurrentValue()), currentValue = _g[0], setCurrentValue = _g[1];
    var onOptionRemove = function (value) {
        return currentValue.filter(function (e) { return e.value !== value; });
    };
    useEffect(function () {
        setCurrentValue(initCurrentValue());
    }, [value]);
    // -------------------------------------------------------------------------------------------------------------------
    /** Изменение значений из выпадающего списка */
    var onOptionChange = function (e, o) {
        if (multiSelect) {
            var el = e.target;
            setCurrentValue(el.checked ? __spreadArray(__spreadArray([], currentValue), [o]) : onOptionRemove(o.value));
        }
        else {
            setInputValue(o.label);
            setCurrentValue([o]);
            toggleDropdown(false);
            setHiddenOptions(new Map());
        }
    };
    /** Закрыть выпадающий список при клике на radio кнопку, так как на ней может не сработать change */
    var onOptClick = function (e) {
        e.stopPropagation();
        toggleDropdown(false);
    };
    /** Выпадающий список с значениями */
    var optionsList = useMemo(function () {
        return options.map(function (v) {
            var onOptChange = function (e) {
                onOptionChange(e, v);
                onChange && onChange(e, v);
                getValue && getValue(v);
            };
            var hiddenClass = hiddenOptions.has(v.value) ? 'rf-select__list-item--hidden' : '';
            var defaultChecked = !!currentValue.find(function (o) { return o.value === v.value; });
            return (React.createElement("li", { className: "rf-select__list-item " + hiddenClass, key: v.value }, multiSelect ? (React.createElement(Checkbox, { label: v.label, value: v.value, disabled: v.disabled, name: props.name, onChange: onOptChange, checked: defaultChecked })) : (React.createElement(Radio, { label: v.label, value: v.value, disabled: v.disabled, name: props.name, onChange: onOptChange, onClick: onOptClick, checked: defaultChecked, icon: false }))));
        });
    }, [options, currentValue, hiddenOptions]);
    // -------------------------------------------------------------------------------------------------------------------
    /** Клик по инпуту открывает выпадающий список */
    var onInputClick = function () {
        if (options.length !== hiddenOptions.size) {
            toggleDropdown(true);
        }
    };
    var openSelectDropdown = function () {
        if (showDropdown) {
            toggleDropdown(false);
        }
        else {
            onInputClick();
        }
    };
    /** ChangeEvent для возможности записывать currentValue в input */
    var onInputChange = function (e) {
        setInputValue(e.target.value);
    };
    // -------------------------------------------------------------------------------------------------------------------
    /** Чипсы под инпутом для множественного выбора */
    var chips = currentValue.map(function (o) { return ({
        id: o.value,
        name: o.label,
        disabled: o.disabled
    }); });
    /** Функция удаления чипсы */
    var onChipRemove = function (id) {
        if (componentNode.current) {
            var checkbox = componentNode.current.querySelector("input[value='" + id + "']");
            if (checkbox) {
                var event_1;
                if (typeof (Event) === 'function') {
                    event_1 = new Event('change');
                }
                else {
                    event_1 = document.createEvent('Event');
                    event_1.initEvent('change', true, true);
                }
                checkbox.dispatchEvent(event_1);
                checkbox.checked = false;
            }
        }
        setCurrentValue(onOptionRemove(id));
        onChipsRemove && onChipsRemove(id, props.name);
    };
    var chipsJSX = multiSelect && chips.length > 0 && (React.createElement("div", { className: 'rf-select__chips' },
        React.createElement(Chips, { variant: 'accent', items: chips, size: size, onRemove: onChipRemove, disabled: props.disabled })));
    // -------------------------------------------------------------------------------------------------------------------
    /** Очистка оля ввода */
    var clearInput = function (e) {
        e.stopPropagation();
        setInputValue('');
        if (componentNode.current) {
            var input = componentNode.current.querySelector('input.rf-input__field');
            if (input) {
                input.focus();
                toggleDropdown(true);
                setHiddenOptions(new Map());
            }
        }
    };
    // -------------------------------------------------------------------------------------------------------------------
    /** Функция отслеживания клика вне элемента */
    var handleClickOutside = useCallback(function () {
        var _a;
        toggleDropdown(false);
        setHiddenOptions(new Map());
        setInputValue(multiSelect ? '' : ((_a = currentValue[0]) === null || _a === void 0 ? void 0 : _a.label) || '');
    }, [currentValue]);
    useClickOutside(componentNode, handleClickOutside);
    // -------------------------------------------------------------------------------------------------------------------
    var clearIconClass = !props.readOnly && inputValue.length > 0 ? 'rf-select__input-clear--show' : '';
    return (React.createElement("div", { className: "rf-select " + sizeClass[size] + " " + (props.className || ''), ref: componentNode },
        React.createElement("div", { className: 'rf-select__input-wrapper' },
            React.createElement(Input, { placeholder: props.placeholder, value: inputValue, readOnly: props.readOnly, onChange: onInputChange, onKeyUp: onSearch, size: size, onClick: onInputClick, disabled: props.disabled }),
            !props.disabled && (React.createElement(Button, { buttonType: 'text', disabled: props.disabled, onClick: clearInput, className: "rf-select__input-icon rf-select__input-clear " + clearIconClass },
                React.createElement(Close, null))),
            !props.disabled && (props.readOnly || inputValue.length === 0) && (React.createElement(Button, { buttonType: 'text', disabled: props.disabled, className: "rf-select__input-icon rf-select__input-angle\n                " + (showDropdown ? 'rf-select__input-angle--rotate' : ''), onClick: openSelectDropdown },
                React.createElement(Angle, null)))),
        React.createElement("ul", { className: "rf-select__list " + (showDropdown ? 'rf-select__list--show' : ''), ref: dropdownRef, onScroll: function (e) { return e.stopPropagation(); } }, optionsList),
        chipsJSX));
};
export default Select;
