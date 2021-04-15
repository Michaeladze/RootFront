import React, { useEffect, useRef } from 'react';
// @ts-ignore
import StickySidebar from 'sticky-sidebar-v2';
import { install } from 'resize-observer';
var StickyContainer = function (_a) {
    var containerSelector = _a.containerSelector, scrollContainer = _a.scrollContainer, children = _a.children, _b = _a.top, top = _b === void 0 ? 0 : _b, _c = _a.bottom, bottom = _c === void 0 ? 0 : _c;
    var container = useRef(null);
    useEffect(function () {
        var sidebar;
        if (container.current) {
            /** IE 11 polyfill - всегда переопределяет ResizeObserver, поэтому сначала проверка */
            if (!window.ResizeObserver) {
                install();
            }
            /** https://blixhavn.github.io/sticky-sidebar-v2/ */
            sidebar = new StickySidebar('.rf-sticky-container', {
                containerSelector: containerSelector,
                scrollContainer: scrollContainer,
                innerWrapperSelector: '.rf-sticky-element',
                topSpacing: top,
                bottomSpacing: bottom
            });
        }
        return function () {
            sidebar.destroy();
        };
    }, [top, bottom]);
    return (React.createElement("div", { className: 'rf-sticky-container', ref: container },
        React.createElement("div", { className: 'rf-sticky-element' }, children)));
};
export default StickyContainer;
