"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./BackdropLoader.scss");
var Preloader_1 = __importDefault(require("../Preloader"));
var react_dom_1 = require("react-dom");
var BackdropLoader = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, variant = _a.variant;
    var div = react_1.useState(document.createElement('div'))[0];
    react_1.useEffect(function () {
        document.body.appendChild(div);
        document.body.style.overflowY = 'hidden';
        return function () {
            document.body.style.overflowY = 'auto';
            document.body.removeChild(div);
        };
    });
    var loader = (react_1.default.createElement("div", { className: "rf__backdrop-loader " + className },
        react_1.default.createElement(Preloader_1.default, { size: 'big', variant: variant })));
    // -------------------------------------------------------------------------------------------------------------------
    return react_dom_1.createPortal(loader, div);
};
exports.default = BackdropLoader;
