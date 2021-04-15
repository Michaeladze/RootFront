"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var path = require('path');
var Subject = require('rxjs').Subject;
var inquirer = require('inquirer');
var fs = require('fs');
//--------------------------
var p = [require('minimist')(process.argv.slice(2)).path || require('path').dirname(require.main.filename)];
var auth = { USERNAME: "", PASSWORD: "" };
global.auth = auth;
/*  1) залогиниться*/
function login(runtask) {
    if (fs.existsSync(path.resolve.apply(path, __spreadArray(__spreadArray([], p), ["login.json"])))) {
        //если пароль сохранем то читаем его
        var data = JSON.parse(fs.readFileSync(path.resolve(p[0], "login.json"), 'utf-8'));
        var AUTH = Buffer.from(data.auth, 'base64').toString().split(':');
        auth.USERNAME = AUTH[0];
        auth.PASSWORD = AUTH[1];
        runtask();
    }
    else {
        //если несохранен создаем файл
        var prompts1 = new Subject();
        inquirer.prompt(prompts1).ui.process.subscribe(function (qwestion) {
            auth.USERNAME = (qwestion.name === 'login') ? qwestion.answer : auth.USERNAME;
            auth.PASSWORD = (qwestion.name === 'password') ? qwestion.answer : auth.PASSWORD;
            if (auth.USERNAME && auth.PASSWORD) {
                fs.writeFileSync(path.resolve.apply(path, __spreadArray(__spreadArray([], p), ["login.json"])), "{\"auth\": \"" + Buffer.from(auth.USERNAME + ':' + auth.PASSWORD).toString('base64') + "\"}\n            ");
                runtask();
            }
        });
        prompts1.next({
            type: 'input',
            name: 'login',
            message: 'Введите логин:'
        });
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
