import React from 'react';
import { UserPhoto } from '../../../../index';
var UsersStack = function (_a) {
    var users = _a.users, radius = _a.radius;
    var LIMIT = 3;
    var slicedUsers = users.filter(function (_, i) { return i < LIMIT; });
    var usersJSX = slicedUsers.map(function (u, i) { return (React.createElement("div", { className: 'users-stack__item', key: u.id, style: {
            transform: "translateX(-" + 16 * i + "px)",
            zIndex: users.length - i
        } },
        React.createElement(UserPhoto, { url: u.photo, fullName: u.fullName, radius: radius }))); });
    return (React.createElement("div", { className: 'users-stack' },
        usersJSX,
        LIMIT < users.length && React.createElement("span", { className: 'users-stack__value' },
            "+",
            users.length - LIMIT)));
};
export default UsersStack;
