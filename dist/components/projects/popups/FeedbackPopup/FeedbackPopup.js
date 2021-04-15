import React, { useState } from 'react';
import Star from '../../../_icons/star-fill';
import { Button, FileInput, FormGroup, Textarea } from '../../../../index';
import { detect } from 'detect-browser';
var FeedbackPopup = function (_a) {
    var user = _a.user, sendFeedback = _a.sendFeedback, onClose = _a.onClose, _b = _a.serviceManagerUrl, serviceManagerUrl = _b === void 0 ? '#' : _b;
    var _c = useState(0), rating = _c[0], setRating = _c[1];
    var _d = useState(''), message = _d[0], setMessage = _d[1];
    var _e = useState([]), attachment = _e[0], setAttachment = _e[1];
    var stars = [
        1,
        2,
        3,
        4,
        5
    ].map(function (n) { return (React.createElement("div", { className: "feedback__star " + (n <= rating ? 'feedback__star--active' : ''), key: n, onClick: function () { return setRating(n); } },
        React.createElement(Star, null))); });
    var onSubmit = function (e) {
        var _a;
        e.preventDefault();
        var browser = detect();
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
    return (React.createElement("form", { className: 'feedback-popup', onSubmit: onSubmit },
        React.createElement("h2", { className: 'feedback-popup__title' }, "\u041E\u0431\u0440\u0430\u0442\u043D\u0430\u044F \u0441\u0432\u044F\u0437\u044C"),
        React.createElement("h4", { className: 'feedback-popup__subtitle' }, "\u041F\u043E\u043C\u043E\u0433\u0438\u0442\u0435 \u043D\u0430\u043C \u0441\u0442\u0430\u0442\u044C \u043B\u0443\u0447\u0448\u0435, \u043E\u0446\u0435\u043D\u0438\u0442\u0435 \u0440\u0430\u0431\u043E\u0442\u0443 \u0441\u0435\u0440\u0432\u0438\u0441\u0430."),
        React.createElement("h4", { className: 'feedback-popup__subtitle' },
            "\u0414\u043B\u044F \u0437\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u0438\u043D\u0446\u0438\u0434\u0435\u043D\u0442\u0430 \u0432\u043E\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435\u0441\u044C",
            React.createElement("a", { href: serviceManagerUrl, className: 'feedback-popup__subtitle--link' }, "\u0441\u0441\u044B\u043B\u043A\u043E\u0439 \u043D\u0430 \u0441\u0435\u0440\u0432\u0438\u0441 \u043C\u0435\u043D\u0435\u0434\u0436\u0435\u0440"),
            "."),
        React.createElement("div", { className: 'feedback__separator' }),
        React.createElement("div", { className: 'feedback__group' },
            React.createElement(FormGroup, { label: '\u041E\u0446\u0435\u043D\u0438\u0442\u0435 \u043D\u0430\u0441' },
                React.createElement("div", { className: 'feedback__rating' }, stars))),
        React.createElement("div", { className: 'feedback__group' },
            React.createElement(FormGroup, { label: '\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439' },
                React.createElement(Textarea, { name: 'message', onKeyUp: onKeyUp, placeholder: '\u041E\u043F\u0438\u0448\u0438\u0442\u0435 \u043F\u0440\u043E\u0431\u043B\u0435\u043C\u0443 \u0438\u043B\u0438 \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043F\u043E\u0436\u0435\u043B\u0430\u043D\u0438\u044F \u043F\u043E \u0440\u0430\u0431\u043E\u0442\u0435 \u0441\u0435\u0440\u0432\u0438\u0441\u0430.' }))),
        React.createElement("div", { className: 'feedback__group' },
            React.createElement(FileInput, { name: 'file', buttonType: 'outlinePrimary', placeholder: '\u041F\u0440\u0438\u043A\u0440\u0435\u043F\u0438\u0442\u044C \u0444\u0430\u0439\u043B', setFile: setFile, maxSize: 500, accept: 'image/*' })),
        React.createElement("div", { className: 'feedback__footer' },
            React.createElement(Button, { className: 'feedback__action', type: 'submit' }, "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C"),
            React.createElement(Button, { className: 'feedback__action', buttonType: 'link', onClick: onClose }, "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C"))));
};
export default FeedbackPopup;
