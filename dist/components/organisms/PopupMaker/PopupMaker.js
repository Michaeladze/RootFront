import React, { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import Modal from '../../molecules/Modal';
/** Стак попапов */
export var popups$$ = new BehaviorSubject([]);
/** Закрываем последний открытый попап */
var onClose = function () {
    popups$$.next(popups$$.getValue().slice(0, -1));
};
/** Основная функция добавления попапа в стек */
export var openPopup = function (component, modalClass) {
    if (modalClass === void 0) { modalClass = ''; }
    var componentModal = (React.createElement(Modal, { className: modalClass, key: popups$$.getValue().length, onClose: onClose }, React.cloneElement(component, { onClose: onClose }, [])));
    popups$$.next(popups$$.getValue().concat([componentModal]));
};
var PopupMaker = function () {
    var _a = useState([]), modalComponent = _a[0], setModalComponent = _a[1];
    /** Подписываемся на стек попапов*/
    useEffect(function () {
        if (popups$$.closed) {
            popups$$ = new BehaviorSubject([]);
        }
        popups$$.subscribe(function (data) {
            setModalComponent(data);
        });
        return function () { return popups$$.unsubscribe(); };
    }, []);
    return React.createElement(React.Fragment, null, modalComponent);
};
export default PopupMaker;
