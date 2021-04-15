var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { useEffect, useState } from 'react';
import { debounceTime, map } from 'rxjs/operators';
import { fromEvent } from 'rxjs';
import { detect } from 'detect-browser';
var useTableOfContents = function (_a) {
    var container = _a.container, selector = _a.selector, _b = _a.additionalOffset, additionalOffset = _b === void 0 ? 0 : _b, _c = _a.deps, deps = _c === void 0 ? [] : _c;
    var _d = useState({
        activeIndex: 0,
        activeTitleId: undefined
    }), activeTitle = _d[0], setActiveTitle = _d[1];
    var _e = useState([]), titlesNodes = _e[0], setTitlesNodes = _e[1];
    var parseTitles = function () {
        if (container.current) {
            var htmlNodes = Array.from(container.current.querySelectorAll(selector));
            return htmlNodes.map(function (node) { return ({
                id: node.id,
                htmlNode: node,
            }); });
        }
        return [];
    };
    var findActiveNode = function () {
        if (titlesNodes.length && container.current) {
            var wrapper_1 = container.current;
            var offsets = titlesNodes.map(function (node) { return node.htmlNode.getBoundingClientRect().top; });
            var activeIndex = offsets.findIndex(function (offset) {
                return offset > wrapper_1.offsetTop + additionalOffset;
            });
            /** Активируем последний заголовок если вся страница проскролена */
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight) {
                activeIndex = titlesNodes.length - 1;
                setActiveTitle({
                    activeTitleId: titlesNodes[activeIndex].id,
                    activeIndex: activeIndex
                });
                return;
            }
            if (activeIndex === -1) {
                activeIndex = titlesNodes.length - 1;
            }
            else if (activeIndex > 0) {
                activeIndex -= 1;
            }
            setActiveTitle({
                activeTitleId: titlesNodes[activeIndex].id,
                activeIndex: activeIndex
            });
        }
    };
    useEffect(function () {
        setTimeout(function () {
            setTitlesNodes(parseTitles());
        });
    }, __spreadArray([selector], deps));
    useEffect(function () {
        if (!activeTitle.activeTitleId && titlesNodes.length) {
            setActiveTitle({
                activeTitleId: titlesNodes[0].id,
                activeIndex: 0
            });
        }
        var browser = detect();
        var subscription = fromEvent(window, 'scroll').pipe(debounceTime((browser === null || browser === void 0 ? void 0 : browser.name) === 'ie' ? 300 : 0), map(function () { return findActiveNode(); })).subscribe();
        return function () {
            subscription.unsubscribe();
        };
    }, [titlesNodes]);
    return activeTitle;
};
export default useTableOfContents;
