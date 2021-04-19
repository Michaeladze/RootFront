"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocation = void 0;
var react_router_dom_1 = require("react-router-dom");
var useLocation = function () {
    // @ts-ignore
    var location = react_router_dom_1.useLocation();
    var query = location.search
        .replace('?', '')
        .split('&')
        .reduce(function (acc, e) {
        var _a = e.split('='), k = _a[0], v = _a[1];
        acc[k] = v;
        return acc;
    }, {});
    location.query = query;
    return location;
};
exports.useLocation = useLocation;
