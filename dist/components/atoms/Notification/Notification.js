import React from 'react';
import Close from '../../_icons/close';
import { variantClass } from '../../../utils/helpers';
import RetryCountDown from '../RetryCountDown';
var Notification = function (_a) {
    var item = _a.item, remove = _a.remove;
    /** Удалить уведомление */
    var removeNotification = function () {
        item.id && remove && remove(item.id);
        item.cancelRetry && item.cancelRetry();
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "rf-notification " + variantClass[item.variant || 'success'] },
            React.createElement("p", { className: 'rf-notification__message' }, item.countdown ? React.createElement(RetryCountDown, { time: item.countdown, action: item.retryAction }) : item.message),
            React.createElement("button", { type: 'button', className: 'rf-notification__close', onClick: removeNotification },
                React.createElement(Close, null)))));
};
export default Notification;
