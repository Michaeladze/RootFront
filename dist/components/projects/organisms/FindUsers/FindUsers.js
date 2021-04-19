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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var close_sm_1 = __importDefault(require("../../../_icons/close-sm"));
var arrow_1 = __importDefault(require("../../../_icons/arrow"));
var info_circle_1 = __importDefault(require("../../../_icons/info-circle"));
var large_search_icon_1 = __importDefault(require("./large-search-icon"));
var react_2 = require("swiper/react");
var swiper_1 = __importStar(require("swiper"));
var index_1 = require("../../../../index");
var Preloader_1 = __importDefault(require("../../../atoms/Preloader"));
var axios_1 = __importDefault(require("axios"));
swiper_1.default.use([swiper_1.Navigation]);
var FindUsers = function (_a) {
    var onClose = _a.onClose, _b = _a.users, users = _b === void 0 ? [] : _b, disableSelected = _a.disableSelected, getUsers = _a.getUsers, _c = _a.subtitle, subtitle = _c === void 0 ? 'Поиск осуществляется по выбранной компании и в рамках одного подразделения.' : _c;
    var inputRef = react_1.useRef(null);
    /** Список выбранных людей */
    var _d = react_1.useState(users), selectedPeople = _d[0], setSelectedPeople = _d[1];
    var selectedPeopleMap = selectedPeople.reduce(function (a, u) {
        a[u.id] = true;
        return a;
    }, {});
    var disablePeopleMap = react_1.useRef(selectedPeopleMap);
    /** Строка поиска */
    var _e = react_1.useState(''), searchString = _e[0], setSearchString = _e[1];
    // -------------------------------------------------------------------------------------------------------------------
    var _f = react_1.useState(true), loaded = _f[0], setLoaded = _f[1];
    var _g = react_1.useState([]), searchResults = _g[0], setSearchResults = _g[1];
    var cancel = react_1.useRef(undefined);
    var cancelRequest = function () {
        if (cancel.current !== undefined) {
            cancel.current();
        }
    };
    var onSearch = function (query) {
        if (query.length < 3) {
            return;
        }
        setLoaded(false);
        cancelRequest();
        axios_1.default.get("sap/opu/odata/sap/ZHRXSS_0685_DELEG_SRV/UserSet?search=" + encodeURIComponent(query), {
            cancelToken: new axios_1.default.CancelToken(function (c) {
                cancel.current = c;
            })
        })
            .then(function (_a) {
            var data = _a.data;
            setSearchResults(data.d.results);
            setLoaded(true);
        })
            .catch(function (_error) {
            setSearchResults([]);
        });
    };
    react_1.useEffect(function () {
        return function () {
            cancelRequest();
        };
    }, []);
    var onClear = function () {
        setSearchString('');
        cancelRequest();
    };
    react_1.useEffect(function () {
        onSearch(searchString);
    }, [searchString]);
    // -------------------------------------------------------------------------------------------------------------------
    var onSubmit = function () {
        getUsers && getUsers(selectedPeople);
        onClose && onClose();
    };
    var inputHandle = function (data) {
        var value = data.target.value;
        setSearchString(value);
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
    var listUsers = searchResults.map(function (item) {
        var label = (react_1.default.createElement("div", { className: 'list-users__user' },
            react_1.default.createElement(index_1.UserPhoto, { url: item.photo, radius: '48px', fullName: item.firstName + " " + item.lastName }),
            react_1.default.createElement("div", { className: 'list-users__texts-wrapper' },
                react_1.default.createElement("h3", { className: 'list-users__user-name' }, item.lastName + " " + item.firstName + " " + item.middleName,
                    item.id && react_1.default.createElement("span", { className: 'list-users__user-id' },
                        "(",
                        item.id,
                        ")"),
                    item.departmentsPath && (react_1.default.createElement(index_1.Tooltip, { portal: true },
                        react_1.default.createElement(info_circle_1.default, { className: 'list-users__user-info' }),
                        react_1.default.createElement(index_1.Structure, { departmentsPath: item.departmentsPath })))),
                react_1.default.createElement("h5", { className: 'list-users__user-position' }, item.department))));
        return (react_1.default.createElement("div", { className: 'list-users__wrapper', key: item.id },
            react_1.default.createElement(index_1.Checkbox, { label: label, align: 'center', value: item.id, disabled: disableSelected && disablePeopleMap.current[item.id], checked: selectedPeopleMap[item.id] || false, onChange: function (e) { return onChange(e, item); } })));
    });
    // -------------------------------------------------------------------------------------------------------------------
    var placeholder = function (placeholder) { return (react_1.default.createElement("div", { className: 'search-results__message' },
        react_1.default.createElement(large_search_icon_1.default, { className: 'search-results__message-icon' }),
        react_1.default.createElement("p", { className: 'search-results__message-text' }, placeholder))); };
    // -------------------------------------------------------------------------------------------------------------------
    /** Выбранные из списка пользователи */
    var listSelectedUsers = selectedPeople.map(function (item) { return (react_1.default.createElement(react_2.SwiperSlide, { className: 'selected_swiper-slide', key: item.id },
        react_1.default.createElement(index_1.UserPhoto, { url: item.photo, radius: '48px', fullName: item.firstName + " " + item.lastName }),
        react_1.default.createElement("h5", { className: 'selected__text' }, "" + item.lastName),
        react_1.default.createElement("h5", { className: 'selected__text' }, "" + item.firstName),
        !(disableSelected && disablePeopleMap.current[item.id]) && (react_1.default.createElement(index_1.Button, { className: 'selected__button', onClick: function () { return removeHandle(item); }, buttonType: 'round' },
            react_1.default.createElement(close_sm_1.default, null))))); });
    // --------------------------------------------------------------------------------------------------------------------
    return (react_1.default.createElement("div", { className: 'find-users__wrapper' },
        react_1.default.createElement("h4", { className: 'find-users__title' }, "\u041F\u043E\u0438\u0441\u043A \u0441\u043E\u0442\u0440\u0443\u0434\u043D\u0438\u043A\u043E\u0432"),
        react_1.default.createElement("p", { className: 'find-users__notice' }, subtitle),
        react_1.default.createElement("div", { className: 'find-users__input-wrapper', ref: inputRef },
            react_1.default.createElement(index_1.Input, { placeholder: '\u041F\u043E\u0438\u0441\u043A', search: true, onKeyUp: inputHandle, autoFocus: true, onClear: onClear })),
        !!selectedPeople.length && (react_1.default.createElement("div", { className: 'swiper__container' },
            react_1.default.createElement("div", { className: 'swiper__wrapper' },
                react_1.default.createElement(react_2.Swiper, { spaceBetween: 0, slidesPerView: 'auto', navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    } }, listSelectedUsers)),
            react_1.default.createElement(index_1.Button, { buttonType: 'round', className: 'swiper-button-next' },
                react_1.default.createElement(arrow_1.default, null)),
            react_1.default.createElement(index_1.Button, { buttonType: 'round', className: 'swiper-button-prev' },
                react_1.default.createElement(arrow_1.default, null)))),
        react_1.default.createElement("div", { className: 'find-users__list-wrapper' }, loaded ? (listUsers.length > 0 ? (listUsers) : (searchString === '' ? placeholder('Начните поиск') : placeholder('Нет результатов для отображения. Измените запрос.'))) : react_1.default.createElement(Preloader_1.default, null)),
        react_1.default.createElement(index_1.PopupFooter, { textAccept: '\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C', onSubmit: onSubmit, onClose: onClose })));
};
exports.default = FindUsers;
