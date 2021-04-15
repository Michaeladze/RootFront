var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useEffect, useRef, useState } from 'react';
import Close from '../../../_icons/close-sm';
import Arrow from '../../../_icons/arrow';
import Info from '../../../_icons/info-circle';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import { Button, Checkbox, Input, PopupFooter, Tooltip, UserPhoto, Structure } from '../../../../index';
import Preloader from '../../../atoms/Preloader';
/** Подключение модулей*/
SwiperCore.use([Navigation]);
var FindUsers = function (_a) {
    var onClose = _a.onClose, _b = _a.users, users = _b === void 0 ? [] : _b, disableSelected = _a.disableSelected, _c = _a.searchData, searchData = _c === void 0 ? [] : _c, onSearch = _a.onSearch, getUsers = _a.getUsers, onClear = _a.onClear, _d = _a.department, department = _d === void 0 ? 'Поиск по всем сотрудникам банка' : _d, _e = _a.loaded, loaded = _e === void 0 ? false : _e, _f = _a.subtitle, subtitle = _f === void 0 ? 'Поиск осуществляется по выбранной компании и в рамках одного подразделения.' : _f;
    var inputRef = useRef(null);
    /** Список выбранных людей */
    var _g = useState(users), selectedPeople = _g[0], setSelectedPeople = _g[1];
    var selectedPeopleMap = selectedPeople.reduce(function (a, u) {
        a[u.id] = true;
        return a;
    }, {});
    var disablePeopleMap = useRef(selectedPeopleMap);
    /** Строка поиска */
    var _h = useState(''), searchString = _h[0], setSearchString = _h[1];
    // --------------------------------------------------------------------------------------------------------------------
    // Почему-то спадает фокус при поиске. Возможно из-за перерисовки компонента
    useEffect(function () {
        setTimeout(function () {
            if (inputRef.current) {
                var element = inputRef.current.querySelector('input');
                if (element) {
                    element.focus();
                }
            }
        });
    }, [searchData]);
    // --------------------------------------------------------------------------------------------------------------------
    /** Сбрасываем поиск на старте */
    useEffect(function () {
        onSearch && onSearch('');
    }, []);
    var onSubmit = function () {
        getUsers && getUsers(selectedPeople);
        onClose && onClose();
    };
    var inputHandle = function (data) {
        var value = data.target.value;
        setSearchString(value);
        onSearch && onSearch(value);
    };
    var addHandle = function (item) {
        setSelectedPeople(__spreadArray(__spreadArray([], selectedPeople), [item]));
    };
    var removeHandle = function (item) {
        setSelectedPeople(selectedPeople.filter(function (data) { return item.id !== data.id; }));
    };
    // --------------------------------------------------------------------------------------------------------------------
    var onChange = function (e, item) {
        if (e.target.checked) {
            addHandle(item);
        }
        else {
            removeHandle(item);
        }
    };
    // --------------------------------------------------------------------------------------------------------------------
    /** Список найденных сотрудников */
    var listUsers = searchData.map(function (item) {
        var label = (React.createElement("div", { className: 'list-users__user' },
            React.createElement(UserPhoto, { url: item.photo, radius: '48px', fullName: item.firstName + " " + item.lastName }),
            React.createElement("div", { className: 'list-users__texts-wrapper' },
                React.createElement("h3", { className: 'list-users__user-name' }, item.lastName + " " + item.firstName + " " + item.middleName,
                    item.id && React.createElement("span", { className: 'list-users__user-id' },
                        "(",
                        item.id,
                        ")"),
                    item.departmentsPath && (React.createElement(Tooltip, null,
                        React.createElement(Info, { className: 'list-users__user-info' }),
                        React.createElement(Structure, { departmentsPath: item.departmentsPath })))),
                React.createElement("h5", { className: 'list-users__user-position' }, item.department))));
        return (React.createElement("div", { className: 'list-users__wrapper', key: item.id },
            React.createElement(Checkbox, { label: label, align: 'center', value: item.id, disabled: disableSelected && disablePeopleMap.current[item.id], defaultChecked: selectedPeopleMap[item.id], onChange: function (e) { return onChange(e, item); } })));
    });
    // --------------------------------------------------------------------------------------------------------------------
    /** Выбранные из списка пользователи */
    var listSelectedUsers = selectedPeople.map(function (item) { return (React.createElement(SwiperSlide, { className: 'selected_swiper-slide', key: item.id },
        React.createElement(UserPhoto, { url: item.photo, radius: '48px', fullName: item.firstName + " " + item.lastName }),
        React.createElement("h5", { className: 'selected__text' }, "" + item.lastName),
        React.createElement("h5", { className: 'selected__text' }, "" + item.firstName),
        !(disableSelected && disablePeopleMap.current[item.id]) && (React.createElement(Button, { className: 'selected__button', onClick: function () { return removeHandle(item); }, buttonType: 'round' },
            React.createElement(Close, null))))); });
    // --------------------------------------------------------------------------------------------------------------------
    return (React.createElement("div", { className: 'find-users__wrapper' },
        React.createElement("h4", { className: 'find-users__title' }, "\u041F\u043E\u0438\u0441\u043A \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432"),
        React.createElement("p", { className: 'find-users__notice' }, subtitle),
        React.createElement("div", { className: 'find-users__input-wrapper', ref: inputRef },
            React.createElement(Input, { placeholder: '\u041F\u043E\u0438\u0441\u043A', search: true, onKeyUp: inputHandle, autoFocus: true, onClear: onClear })),
        !!selectedPeople.length && (React.createElement("div", { className: 'swiper__container' },
            React.createElement("div", { className: 'swiper__wrapper' },
                React.createElement(Swiper, { spaceBetween: 0, slidesPerView: 'auto', navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    } }, listSelectedUsers)),
            React.createElement(Button, { buttonType: 'round', className: 'swiper-button-next' },
                React.createElement(Arrow, null)),
            React.createElement(Button, { buttonType: 'round', className: 'swiper-button-prev' },
                React.createElement(Arrow, null)))),
        React.createElement("div", { className: 'find-users__list-wrapper' }, loaded ? (searchString === '' || listUsers.length > 0 ? (listUsers) : (React.createElement("span", { className: 'find-users__message' }, "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E"))) : (React.createElement(Preloader, null))),
        React.createElement(PopupFooter, { textAccept: '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C', onSubmit: onSubmit, onClose: onClose })));
};
export default FindUsers;
