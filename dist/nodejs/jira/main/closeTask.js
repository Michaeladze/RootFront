"use strict";
var inquirer = require('inquirer');
var Subject = require('rxjs').Subject;
var lib = require('./../create');
var log = require('./../utils/log').log;
//-------------------------
// сообщение
var message = undefined;
// потраченное время
var time = undefined;
// подтверждение
var conf = undefined;
// текущая таска
var taskId = undefined;
var sub = new Subject();
//======================================================================================================================
function callbackSpendTime() {
    lib.requests.closeTask(taskId, message, function () { return lib.methods.selectTask(); });
    log('info', "задача закрыта, время учтено");
}
function requestClosetask(t) {
    console.log(t);
    taskId = t;
    // основная подписка
    inquirer.prompt(sub).ui.process.subscribe(function (q) {
        message = (q.name === 'message') ? q.answer : message;
        time = (q.name === 'time') ? q.answer : time;
        conf = (q.name === 'conf') ? q.answer : conf;
        if (!conf) {
            if (message && time && conf === undefined)
                apply();
            (conf === false) && (conf = time = message = undefined, req(taskId));
        }
        else {
            sub.unsubscribe();
            lib.requests.spendTime(taskId, message, time, callbackSpendTime);
        }
    });
    req();
}
function apply() {
    sub.next({
        type: 'confirm',
        message: "\u0417\u0430\u0434\u0430\u0447\u0430: " + taskId + "\n\u041A\u043E\u043C\u043C\u0435\u043D\u0442: " + message + "\n\u0412\u0440\u0435\u043C\u044F: " + (time.slice(0, 2) + 'час ' + time.slice(2, 4) + ' минут') + " \u0432\u0435\u0440\u043D\u043E?",
        name: 'conf'
    });
}
// зацикленная функция
function req() {
    sub.next({
        type: 'input',
        message: "\u041D\u0430\u043F\u0438\u0448\u0438\u0442\u0435 \u043A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0439:",
        name: 'message'
    });
    sub.next({
        type: 'input',
        message: "\u0421\u043A\u043E\u043B\u044C\u043A\u043E \u0447\u0430\u0441\u043E\u0432 \u043F\u043E\u0442\u0440\u0430\u0447\u0435\u043D\u043E \u043D\u0430 \u0437\u0430\u0434\u0430\u0447\u0443 (\u043F\u0440\u0438\u043C\u0435\u0440 00.45) ",
        name: 'time',
        validate: (function (t) {
            var val = !isNaN(t) && t.length <= 4;
            (!val) && console.log("\u041D\u0435 \u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 (" + t + ")!!");
            return val;
        }),
        transformer: (function (t) {
            if (t.length > 2) {
                t = t.slice(0, 2) + 'час ' + t.slice(2) + 'минут';
            }
            if (t.length > 15) {
                t = t.slice(0, 15);
            }
            return t;
        })
    });
}
//--------------------------
exports.requestClosetask = requestClosetask;
