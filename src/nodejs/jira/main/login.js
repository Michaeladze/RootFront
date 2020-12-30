
const path = require('path');
const {Subject} = require('rxjs');
const inquirer = require('inquirer');
const fs = require('fs');
//--------------------------
const p = [require('minimist')(process.argv.slice(2)).path || require('path').dirname(require.main.filename)];
let auth={USERNAME:"", PASSWORD : ""};
global.auth=auth;


/*  1) залогиниться*/
function login(runtask) {
    if (fs.existsSync(path.resolve(...p, `login.json`))) {
        //если пароль сохранем то читаем его
        const data = JSON.parse(fs.readFileSync(path.resolve(p[0], `login.json`), 'utf-8'));
        const AUTH = Buffer.from(data.auth, 'base64').toString().split(':');
        auth.USERNAME = AUTH[0];
        auth.PASSWORD = AUTH[1];
        runtask();
    } else {
        //если несохранен создаем файл
        const prompts1 = new Subject();
        inquirer.prompt(prompts1).ui.process.subscribe(qwestion => {
            auth.USERNAME = (qwestion.name === 'login') ? qwestion.answer : auth.USERNAME;
            auth.PASSWORD = (qwestion.name === 'password') ? qwestion.answer : auth.PASSWORD;
            if (auth.USERNAME && auth.PASSWORD) {
                fs.writeFileSync(path.resolve(...p, `login.json`),
                    `{"auth": "${Buffer.from(auth.USERNAME + ':' + auth.PASSWORD).toString('base64')}"}
            `);
                runtask();
            }
        });
        prompts1.next({
                type: 'input',
                name: 'login',
                message: 'Введите логин:'
            }
        );
        prompts1.next({
            type: 'password',
            name: 'password',
            mask: '*',
            message: 'Введите пароль:'
        });
    }
}

//--------------------------
exports.login = login;


