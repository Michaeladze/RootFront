import React from 'react';
import Angle from '../../_icons/angle-down';
import { Link } from 'react-router-dom';
var Breadcrumbs = function (_a) {
    var list = _a.list;
    var listJSX = list.map(function (b, i) { return (React.createElement("div", { className: 'breadcrumb', key: i },
        React.createElement(Link, { to: b.url, className: "breadcrumb__link " + (b.disabled ? 'breadcrumb__link--disabled' : '') }, b.label),
        React.createElement(Angle, { className: 'breadcrumb__angle' }))); });
    return React.createElement("div", { className: 'breadcrumbs' }, listJSX);
};
export default Breadcrumbs;
