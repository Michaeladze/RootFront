/** colored console */
const chalk = require('chalk');

/** универсальное логирование */
let log = (sType, sLogMsg,callback = ()=>{}) => {

    switch (sType) {
        case 'error':
            console.error(chalk.red(`
          ${sLogMsg}

        `));
            callback()
            break;
        case 'warn':
            console.warn(chalk.yellow(`
             ${sLogMsg}
        `));
            callback();
            break;
        case 'info':
            console.info(chalk.hex('#87CEFA')(`
          ${sLogMsg}

        `));
            callback();
            break;

        default:
            break;
    }
};
exports.log = log;
