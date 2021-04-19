"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUndo = exports.deepCopy = void 0;
var react_1 = require("react");
var deepCopy = function (obj) {
    return obj ? JSON.parse(JSON.stringify(obj)) : obj;
};
exports.deepCopy = deepCopy;
var useUndo = function (config) {
    var UNDO_CAPACITY = config.capacity || 20;
    var _a = react_1.useState(config.state), state = _a[0], setState = _a[1];
    /** Undo */
    var _b = react_1.useState([]), undo = _b[0], setUndo = _b[1];
    var pushUndo = function (nextState, fromRedo) {
        if (!fromRedo) {
            setRedo([]);
        }
        if (undo.length === UNDO_CAPACITY) {
            undo.shift();
        }
        setUndo(function (l) { return __spreadArray(__spreadArray([], l), [exports.deepCopy(state)]); });
        setState(nextState);
    };
    /** Redo */
    var _c = react_1.useState([]), redo = _c[0], setRedo = _c[1];
    var pushRedo = function (state) {
        setRedo(function (l) { return __spreadArray(__spreadArray([], l), [exports.deepCopy(state)]); });
    };
    var dispatchUndo = function () {
        var s = undo.pop();
        if (s) {
            pushRedo(state);
            setState(s);
        }
    };
    var dispatchRedo = function () {
        var s = redo.pop();
        if (s) {
            pushUndo(state, true);
            setState(s);
        }
    };
    react_1.useEffect(function () {
        var onUndo = function (e) {
            if ((e.ctrlKey || e.key === 'Meta') && e.code === 'KeyZ') {
                e.shiftKey ? dispatchRedo() : dispatchUndo();
            }
        };
        window.addEventListener('keypress', onUndo);
        return function () {
            window.removeEventListener('keypress', onUndo);
        };
    }, [dispatchRedo, dispatchUndo]);
    /** Сбросить */
    var reset = react_1.useCallback(function (nextState) {
        pushUndo(exports.deepCopy(state));
        nextState && setState(exports.deepCopy(nextState));
        setRedo([]);
    }, [state]);
    return {
        undo: undo,
        redo: redo,
        state: state,
        pushUndo: pushUndo,
        dispatchUndo: dispatchUndo,
        dispatchRedo: dispatchRedo,
        reset: reset
    };
};
exports.useUndo = useUndo;
