import React from 'react';
import './Story.scss';
var Story = function (_a) {
    var name = _a.name, description = _a.description, width = _a.width, height = _a.height, children = _a.children;
    var style = {
        width: width ? width + "px" : '100%',
        height: height ? height + "px" : '100%'
    };
    return (React.createElement("div", { className: 'story', style: style },
        React.createElement("h2", { className: 'story__name' }, name),
        description && React.createElement("p", { className: 'story__description' }, description),
        React.createElement("div", { className: 'story__wrapper' }, children)));
};
export default Story;
