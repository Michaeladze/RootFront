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
var react_1 = __importStar(require("react"));
var star_fill_1 = __importDefault(require("../../../_icons/star-fill"));
var index_1 = require("../../../../index");
var detect_browser_1 = require("detect-browser");
var FeedbackPopup = function (_a) {
    var user = _a.user, sendFeedback = _a.sendFeedback, onClose = _a.onClose, _b = _a.serviceManagerUrl, serviceManagerUrl = _b === void 0 ? '#' : _b;
    var _c = react_1.useState(0), rating = _c[0], setRating = _c[1];
    var _d = react_1.useState(''), message = _d[0], setMessage = _d[1];
    var _e = react_1.useState([]), attachment = _e[0], setAttachment = _e[1];
    var stars = [
        1,
        2,
        3,
        4,
        5
    ].map(function (n) { return (react_1.default.createElement("div", { className: "feedback__star " + (n <= rating ? 'feedback__star--active' : ''), key: n, onClick: function () { return setRating(n); } },
        react_1.default.createElement(star_fill_1.default, null))); });
    var onSubmit = function (e) {
        var _a;
        e.preventDefault();
        var browser = detect_browser_1.detect();
        sendFeedback({
            zdate: Date.now().toString(),
            projectId: '1',
            rate: rating * 2,
            browser: browser.name + " \u0412\u0435\u0440\u0441\u0438\u044F " + browser.version + ", " + browser.os,
            status: '0',
            text: message,
            userId: user.id,
            userName: user.fullName,
            file64: ((_a = attachment[0]) === null || _a === void 0 ? void 0 : _a.base64) || '',
            screen: window.innerWidth + "x" + window.innerHeight,
            photo: user.photo,
            userPosition: user.position,
            userDepartment: user.department,
            email: user.email || ''
        });
        onClose && onClose();
    };
    var setFile = function (file) {
        if (file.length > 0 && attachment.length < 3) {
            setAttachment(file.slice(0, 3));
        }
    };
    var onKeyUp = function (e) {
        setMessage(e.target.value);
    };
    return (react_1.default.createElement("form", { className: 'feedback-popup', onSubmit: onSubmit },
        react_1.default.createElement("h2", { className: 'feedback-popup__title' }, "\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C"),
        react_1.default.createElement("h4", { className: 'feedback-popup__subtitle' }, "\u041F\u043E\u043C\u043E\u0433\u0438\u0442\u0435 \u043D\u0430\u043C \u0441\u0442\u0430\u0442\u044C \u043B\u0443\u0447\u0448\u0435, \u043E\u0446\u0435\u043D\u0438\u0442\u0435 \u0440\u0430\u0431\u043E\u0442\u0443 \u0441\u0435\u0440\u0432\u0438\u0441\u0430."),
        react_1.default.createElement("h4", { className: 'feedback-popup__subtitle' },
            "\u0414\u043B\u044F \u0437\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u0438\u043D\u0446\u0438\u0434\u0435\u043D\u0442\u0430 \u0432\u043E\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435\u0441\u044C \u0426\u0421\u041F\u041F (",
            react_1.default.createElement("a", { href: serviceManagerUrl, className: 'feedback-popup__subtitle--link' }, "https://cspp.vtb.ru"),
            ")."),
        react_1.default.createElement("div", { className: 'feedback__separator' }),
        react_1.default.createElement("div", { className: 'feedback__group' },
            react_1.default.createElement(index_1.FormGroup, { label: '\u041E\u0446\u0435\u043D\u0438\u0442\u0435 \u043D\u0430\u0441' },
                react_1.default.createElement("div", { className: 'feedback__rating' }, stars))),
        react_1.default.createElement("div", { className: 'feedback__group' },
            react_1.default.createElement(index_1.FormGroup, { label: '\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439' },
                react_1.default.createElement(index_1.Textarea, { name: 'message', onKeyUp: onKeyUp, placeholder: '\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0443 \u0438\u043B\u0438 \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043F\u043E\u0436\u0435\u043B\u0430\u043D\u0438\u044F \u043F\u043E \u0440\u0430\u0431\u043E\u0442\u0435 \u0441\u0435\u0440\u0432\u0438\u0441\u0430.' }))),
        react_1.default.createElement("div", { className: 'feedback__group' },
            react_1.default.createElement(index_1.FileInput, { name: 'file', buttonType: 'outlinePrimary', placeholder: '\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u0444\u0430\u0439\u043B', setFile: setFile, maxSize: 500, accept: 'image/*' })),
        react_1.default.createElement("div", { className: 'feedback__footer' },
            react_1.default.createElement(index_1.Button, { className: 'feedback__action', type: 'submit' }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C"),
            react_1.default.createElement(index_1.Button, { className: 'feedback__action', buttonType: 'link', onClick: onClose }, "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C"))));
};
exports.default = FeedbackPopup;
