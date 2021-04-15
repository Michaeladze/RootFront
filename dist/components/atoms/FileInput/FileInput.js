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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useCallback, useRef, useState } from 'react';
import { getBase64, validateFile } from '../../../utils/file-utils';
import Chips from '../../molecules/Chips/Chips';
import Button from '../Button';
import { sendNotification } from '../../../index';
var FileInput = function (_a) {
    var _b = _a.name, name = _b === void 0 ? '' : _b, _c = _a.accept, accept = _c === void 0 ? '*' : _c, _d = _a.multiple, multiple = _d === void 0 ? false : _d, _e = _a.className, className = _e === void 0 ? '' : _e, _f = _a.defaultValue, defaultValue = _f === void 0 ? '' : _f, _g = _a.disabled, disabled = _g === void 0 ? false : _g, _h = _a.placeholder, placeholder = _h === void 0 ? '' : _h, setFile = _a.setFile, onError = _a.onError, maxSize = _a.maxSize, count = _a.count, props = __rest(_a, ["name", "accept", "multiple", "className", "defaultValue", "disabled", "placeholder", "setFile", "onError", "maxSize", "count"]);
    /** Файл */
    var _j = useState([]), file = _j[0], uploadFile = _j[1];
    /** Ссылка на инпут */
    var ref = useRef(null);
    /** Получаем картинку */
    var onChange = function () {
        if (ref.current && ref.current.files) {
            var promises_1 = [];
            Array.from(ref.current.files).slice(0, count).forEach(function (fl) {
                var validationResult = validateFile(fl, {
                    maxSize: maxSize,
                    accept: accept
                });
                if (validationResult.valid) {
                    promises_1.push(getBase64(fl));
                }
                else {
                    sendNotification({
                        message: validationResult.error,
                        variant: 'danger'
                    });
                    onError && onError(new Error(validationResult.error));
                }
            });
            Promise.all(promises_1)
                .then(function (data) {
                if (data && ref.current && ref.current.files) {
                    var newFiles_1 = [];
                    if (multiple) {
                        var keysMap_1 = {};
                        __spreadArray(__spreadArray([], file), data).forEach(function (f) {
                            if (!keysMap_1[f.file.name + f.file.lastModified]) {
                                keysMap_1[f.file.name + f.file.lastModified] = true;
                                newFiles_1.push(f);
                            }
                        });
                    }
                    else {
                        newFiles_1.push.apply(newFiles_1, data);
                    }
                    setFile(newFiles_1);
                    uploadFile(newFiles_1);
                    // ref.current.value = '';
                }
            })
                .catch(function (error) {
                console.log('%c [Ошибка] Не удалось загрузить файл(ы)', 'color: #FF5722');
                console.log(error);
                if (ref.current) {
                    ref.current.value = '';
                }
                onError && onError(new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C " + (multiple ? 'файлы' : 'файл')));
            });
        }
    };
    var multipleChips = file.map(function (f) { return ({
        id: f.file.name + f.file.lastModified,
        name: f.file.name
    }); });
    var onFileRemove = useCallback(function (id) {
        var files = file.filter(function (f) { return f.file.name + f.file.lastModified !== id; });
        uploadFile(files);
        setFile(files);
    }, [file]);
    /** Программный клик по инпуту */
    var onClick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (ref.current) {
            ref.current.click();
        }
    };
    return (React.createElement("div", { className: 'file-input__wrapper' },
        React.createElement("label", { className: "rf-input " + (className || '') },
            React.createElement("input", { ref: ref, type: 'file', name: name, className: 'rf-input__file-hidden', defaultValue: defaultValue, accept: accept, placeholder: placeholder || 'Выберите файл', disabled: disabled, onChange: onChange, multiple: multiple }),
            React.createElement(Button, __assign({}, props, { type: 'button', className: 'file-input__button', onClick: onClick, disabled: disabled }), placeholder)),
        file.length > 0 && (React.createElement("div", { className: 'file-input__chips' },
            React.createElement(Chips, { items: multipleChips, onRemove: multiple ? onFileRemove : undefined })))));
};
export default FileInput;
