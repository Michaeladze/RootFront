"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
require("./Notification.scss");
var close_1 = __importDefault(require("../../_icons/close"));
var helpers_1 = require("../../../utils/helpers");
var RetryCountDown_1 = __importDefault(require("../RetryCountDown"));
var Notification = function (_a) {
    var item = _a.item, remove = _a.remove;
    /** Удалить уведомление */
    var removeNotification = function () {
        item.id && remove && remove(item.id);
        item.cancelRetry && item.cancelRetry();
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "rf-notification " + helpers_1.variantClass[item.variant || 'success'] },
            react_1.default.createElement("p", { className: 'rf-notification__message' }, item.countdown ? react_1.default.createElement(RetryCountDown_1.default, { time: item.countdown, action: item.retryAction }) : item.message),
            react_1.default.createElement("button", { type: 'button', className: 'rf-notification__close', onClick: removeNotification },
                react_1.default.createElement(close_1.default, null)))));
};
exports.default = Notification;
