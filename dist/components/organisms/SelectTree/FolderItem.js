import React, { useEffect, useState } from 'react';
import Folder from './Folder';
import Angle from '../../_icons/angle-down';
import { Checkbox, Radio } from '../../../index';
var FolderItem = function (_a) {
    var item = _a.item, onChange = _a.onChange, depth = _a.depth, open = _a.open, multiple = _a.multiple, activeItem = _a.activeItem;
    var _b = useState(open), showFolder = _b[0], toggleFolder = _b[1];
    useEffect(function () {
        toggleFolder(open);
    }, [open]);
    // ---------------------------------------------------------------------------------------------------------------------------------------
    var openClass = showFolder && item.children ? 'rf-folder__item--open' : 'rf-folder__item--close';
    var showFolderClass = showFolder ? '' : 'rf-folder__item-folder--hidden';
    var rotateIconClass = showFolder ? '' : 'rf-folder__item-label-icon--rotate';
    var showIconClass = item.children && item.children.length > 0 ? '' : 'rf-folder__item-label-icon--hidden';
    var itemChildrenClass = item.children ? '' : 'rf-folder__item--no-children';
    var activeClass = (activeItem === null || activeItem === void 0 ? void 0 : activeItem.value) === item.value && !multiple ? 'rf-folder__item--active' : '';
    // ---------------------------------------------------------------------------------------------------------------------------------------
    var handleChange = function (e) {
        if (multiple) {
            item.checked = e.target.checked;
            item.hasCheckedChild = false;
        }
        onChange(e.target.checked, item);
    };
    // ---------------------------------------------------------------------------------------------------------------------------------------
    return (React.createElement("div", { className: "rf-folder__item " + openClass + " " + itemChildrenClass + " " + activeClass },
        React.createElement("div", { className: 'rf-folder__item-label', onClick: function () { return toggleFolder(!showFolder); } },
            React.createElement(Angle, { className: "rf-folder__item-label-icon " + rotateIconClass + " " + showIconClass }),
            multiple ? (React.createElement(Checkbox, { label: item.label, value: item.value, disabled: item.disabled, icon: !item.disabled, checked: item.checked, halfChecked: item.hasCheckedChild, onChange: handleChange })) : (React.createElement(Radio, { name: 'select-tree_unique-name', label: item.label, value: item.value, disabled: item.disabled, icon: !item.disabled, checked: (activeItem === null || activeItem === void 0 ? void 0 : activeItem.value) === item.value || item.checked, onChange: handleChange }))),
        item.children && item.children.length > 0 && (React.createElement("div", { className: "rf-folder__item-folder " + showFolderClass },
            React.createElement(Folder, { list: item.children, onChange: onChange, parent: item, depth: depth, open: open, multiple: multiple, activeItem: activeItem })))));
};
export default FolderItem;
