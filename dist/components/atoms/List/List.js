import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuContext } from '../../molecules/Menu/Menu';
var List = function (_a) {
    var list = _a.list;
    var onElementClick = function (e, li) {
        e.stopPropagation();
        !li.url && e.preventDefault();
        li.handler && li.handler();
        onClose && onClose();
    };
    var onClose = useContext(MenuContext).onClose;
    var listElementJSX = list &&
        list.map(function (li, i) {
            var disabledClass = li.disabled ? 'rf-list__element--disabled' : '';
            var separatedClass = li.separated ? 'rf-list__element--separated' : '';
            return (React.createElement("li", { className: 'rf-li', key: li.value || i },
                li.separated && React.createElement("div", { className: 'rf-list__separator' }),
                li.url ? (React.createElement(NavLink, { to: li.url, className: "rf-list__element " + disabledClass + " " + separatedClass, onClick: function (e) { return onElementClick(e, li); } },
                    " ",
                    li.label,
                    " ")) : (React.createElement("div", { className: "rf-list__element " + disabledClass + " " + separatedClass, onClick: function (e) { return onElementClick(e, li); } }, li.label))));
        });
    // -------------------------------------------------------------------------------------------------------------------
    return React.createElement("ul", { className: 'rf-list' }, listElementJSX);
};
export default List;
