import React from 'react';
import Angle from '../../../_icons/angle-down';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../../../molecules/Breadcrumbs';
import Button from '../../../atoms/Button';
import Container from '../../../atoms/Container';
var PageTemplate = function (_a) {
    var title = _a.title, breadcrumbs = _a.breadcrumbs, children = _a.children, _b = _a.backUrl, backUrl = _b === void 0 ? '/' : _b, _c = _a.className, className = _c === void 0 ? '' : _c, _d = _a.onlyTitle, onlyTitle = _d === void 0 ? false : _d;
    return (React.createElement("div", { className: "page-template " + className },
        React.createElement("div", { className: 'page-template__underlay' }),
        React.createElement(Container, null,
            React.createElement("div", { className: 'page-template__content-wrapper' },
                React.createElement("header", { className: 'page-template__header' },
                    React.createElement("div", { className: 'page-template__header-row' },
                        !onlyTitle && (React.createElement(Link, { to: backUrl },
                            React.createElement(Button, { buttonType: 'round', className: 'page-template__header-back' },
                                React.createElement(Angle, { className: 'page-template__header-icon' })))),
                        React.createElement("h2", { className: 'page-template__title' }, title)),
                    !onlyTitle && breadcrumbs && React.createElement(Breadcrumbs, { list: breadcrumbs })),
                React.createElement("div", { className: 'page-template__content' }, children)))));
};
export default PageTemplate;
