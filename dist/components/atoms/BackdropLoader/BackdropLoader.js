import React from 'react';
import Preloader from '../Preloader';
var BackdropLoader = function (_a) {
    // -------------------------------------------------------------------------------------------------------------------
    var _b = _a.className, className = _b === void 0 ? '' : _b, variant = _a.variant;
    return (React.createElement("div", { className: "rf__backdrop-loader " + className },
        React.createElement(Preloader, { size: 'big', variant: variant })));
};
export default BackdropLoader;
