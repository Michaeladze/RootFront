import React from 'react';
import Button from '../../../atoms/Button';
import UserPhoto from '../../atoms/UserPhoto';
import { Menu } from '../../../../index';
var User = function (_a) {
    var _b = _a.actionsList, actionsList = _b === void 0 ? [] : _b, _c = _a.menuPosition, menuPosition = _c === void 0 ? 'right' : _c, user = _a.user, _d = _a.showName, showName = _d === void 0 ? true : _d, radius = _a.radius;
    var name = (user === null || user === void 0 ? void 0 : user.fullName) || (user === null || user === void 0 ? void 0 : user.firstName) + " " + (user === null || user === void 0 ? void 0 : user.lastName);
    return (React.createElement(React.Fragment, null, user && (React.createElement(Menu, { list: actionsList, position: menuPosition },
        React.createElement(Button, { className: 'app-header__user-button', buttonType: 'text' },
            React.createElement(UserPhoto, { url: user.photo, fullName: name, radius: radius }),
            showName && React.createElement("h4", { className: 'user__name' }, user.firstName))))));
};
export default User;
