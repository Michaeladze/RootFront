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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quillGet = void 0;
var react_1 = __importStar(require("react"));
var react_quill_1 = __importDefault(require("react-quill"));
require("react-quill/dist/quill.snow.css");
var quill_1 = __importDefault(require("quill"));
var helpers_1 = require("../../../utils/helpers");
require("./TextEditor.scss");
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
        helpers_1.variants.forEach(function (v) {
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
    var componentNode = react_1.useRef(null);
    /** Ссылка на input */
    var input = react_1.useRef(null);
    /** Контент */
    var _d = react_1.useState(''), text = _d[0], setText = _d[1];
    // -------------------------------------------------------------------------------------------------------------------
    /** Вешаем классс invalid */
    react_1.useEffect(function () {
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
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "rf-text__editor " + className, ref: componentNode },
            react_1.default.createElement(react_quill_1.default, { defaultValue: defaultValue ? exports.quillGet(defaultValue).content : text, formats: formats, modules: modules, onChange: handleChange }),
            react_1.default.createElement("input", { className: 'rf-text__editor-input', ref: input, type: 'text', name: name })),
        preview && react_1.default.createElement("div", { className: 'rf-editor__preview' },
            react_1.default.createElement("div", { className: 'rf-editor__output', dangerouslySetInnerHTML: { __html: text } }))));
};
exports.default = TextEditor;
// ---------------------------------------------------------------------------------------------------------------------
/** Конвертируем quill delta в html */
var quillGet = function (inputDelta) {
    var tempCont = document.createElement('div');
    var quill = (new quill_1.default(tempCont));
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
exports.quillGet = quillGet;
