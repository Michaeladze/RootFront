"use strict";
/** colored console */
var chalk = require('chalk');
/** универсальное логирование */
var log = function (sType, sLogMsg, callback) {
    if (callback === void 0) { callback = function () { }; }
    switch (sType) {
        case 'error':
            console.error(chalk.red("\n          " + sLogMsg + "\n\n        "));
            callback();
            break;
        case 'warn':
            console.warn(chalk.yellow("\n             " + sLogMsg + "\n        "));
            callback();
            break;
        case 'info':
            console.info(chalk.hex('#87CEFA')("\n          " + sLogMsg + "\n\n        "));
            callback();
            break;
        default:
            break;
    }
};
exports.log = log;
