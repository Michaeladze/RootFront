/** colored console */
const chalk = require('chalk');

/** универсальное логирование */
let log = (sType, sLogMsg, ussage = "usage: yarn redux --name=<filename> --components=<listItem,listItem> --path=<path>(optional) --project=<project>(optional)") => {

    switch (sType) {
        case 'error':
            console.error(chalk.red(`
        ERROR: ${sLogMsg}
        
        `));
            process.exit(1);
            break;
        case 'warn':
            console.warn(chalk.yellow(`
        WARN: ${sLogMsg}
           ${ussage}
        `));
            break;
        case 'info':
            console.info(chalk.hex('#87CEFA')(`${sLogMsg}`));
            break;

        default:
            break;
    }
};

//
// /** универсальное логирование */
// export const checkFile = (fileName = '_jira/login.json', object, callbackfunc) => {
//
//
//     const f = fileName.split('/');
//     const name = f[f.length - 1];
//     f.slice(0, -1);
//     object = [
//         {
//             text: 'Введите логин: ',
//             key: 'username'
//         }, {
//             text: 'Введите пароль: ',
//             key: 'password'
//         }
//     ];
//     let index = 0;
//
//     const req = () => {
//         rl.question(object[index].text, function (data) {
//             object[index].data = data;
//             if (index < object.length-1) {
//                 index += 1;
//                 req();
//             } else {
//
//                 rl.close();
//             }
//         });
//     };
//
//     if (fs.existsSync(path.resolve(...p, fileName))) {
//         console.log('yes');
//         const data = JSON.parse(fs.readFileSync(path.resolve(f.join(), name), 'utf-8'));
//         callbackfunc(data);
//     } else {
//
//
//         rl.question('Введите логин: ', function (login) {
//             rl.question('Введите пароль: ', function (pass) {
//                 fs.writeFileSync(path.resolve(...p, fileName),
//                     `{
//  "username": "${login}",
//  "password": "${pass}"
//  }`);
//
//                 rl.close();
//                 task(login, pass);
//             });
//         });
//
//     }
//
// };
//

module.exports = log;
