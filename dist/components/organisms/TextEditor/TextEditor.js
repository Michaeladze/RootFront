import React, { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';
import { variants } from '../../../utils/helpers';
var TextEditor = function (_a) {
    var name = _a.name, preview = _a.preview, getValue = _a.getValue, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.defaultValue, defaultValue = _c === void 0 ? '' : _c, colors = _a.colors;
    var palettes = [
        100,
        200,
        300,
        400,
        500,
        600,
        700,
        800,
        900
    ];
    var defaultColors = palettes.reduce(function (r, c) {
        variants.forEach(function (v) {
            r.push("var(--" + v + "-" + c + ")");
        });
        return r;
    }, []);
    /** Массив цветов */
    var c = colors || defaultColors;
    /** Модули quill */
    var modules = {
        toolbar: [
            [
                {
                    'header': [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        false
                    ]
                }
            ],
            [
                'bold',
                'italic',
                'underline',
                'strike',
                'blockquote'
            ],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'color': c }, { 'background': c }]
        ]
    };
    /** Форматы quill */
    var formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'color',
        'background',
        'script'
    ];
    // -------------------------------------------------------------------------------------------------------------------
    /** Ссылка на текущий компонент */
    var componentNode = useRef(null);
    /** Ссылка на input */
    var input = useRef(null);
    /** Контент */
    var _d = useState(''), text = _d[0], setText = _d[1];
    // -------------------------------------------------------------------------------------------------------------------
    /** Вешаем классс invalid */
    useEffect(function () {
        if (componentNode.current && input.current) {
            var invalid = input.current.classList.contains('invalid');
            invalid ? componentNode.current.classList.add('invalid') : componentNode.current.classList.remove('invalid');
        }
    });
    // -------------------------------------------------------------------------------------------------------------------
    /** Обработка ввода */
    var handleChange = function (e, delta, source, editor) {
        var c = editor.getContents();
        if (input.current) {
            input.current.value = JSON.stringify(c);
            getValue && getValue(c);
            var event_1 = new Event('keyup');
            input.current.dispatchEvent(event_1);
        }
        setText(e);
    };
    // -------------------------------------------------------------------------------------------------------------------
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "rf-text__editor " + className, ref: componentNode },
            React.createElement(ReactQuill, { defaultValue: defaultValue ? quillGet(defaultValue).content : text, formats: formats, modules: modules, onChange: handleChange }),
            React.createElement("input", { className: 'rf-text__editor-input', ref: input, type: 'text', name: name })),
        preview && React.createElement("div", { className: 'rf-editor__preview' },
            React.createElement("div", { className: 'rf-editor__output', dangerouslySetInnerHTML: { __html: text } }))));
};
export default TextEditor;
// ---------------------------------------------------------------------------------------------------------------------
/** Конвертируем quill delta в html */
export var quillGet = function (inputDelta) {
    var tempCont = document.createElement('div');
    var quill = (new Quill(tempCont));
    var html = inputDelta;
    var text = inputDelta;
    var content = inputDelta;
    try {
        quill.setContents(JSON.parse(inputDelta));
        html = tempCont.getElementsByClassName('ql-editor')[0].innerHTML;
        if (html === '<p><br></p>') {
            html = inputDelta;
        }
        text = quill.getText();
        content = JSON.parse(inputDelta);
    }
    catch (e) {
        console.log('inputDelta is not a Delta, but a plain text');
    }
    return {
        html: html,
        text: text,
        content: content
    };
};
