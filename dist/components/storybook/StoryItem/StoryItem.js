import React from 'react';
import './StoryItem.scss';
var StoryItem = function (_a) {
    var subtitle = _a.subtitle, description = _a.description, children = _a.children;
    return (React.createElement("div", { className: 'story__item' },
        subtitle && React.createElement("h4", { className: 'story__subtitle' }, subtitle),
        description && React.createElement("p", { className: 'story__description' }, description),
        React.createElement("div", { className: 'story__content' }, children)));
};
export default StoryItem;
