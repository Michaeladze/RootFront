const inquirer = require('inquirer');
const {Subject} = require('rxjs');
const lib = require('./../create');
const {log}=require('./../utils/log');
//-------------------------
// сообщение
let message = undefined;
// потраченное время
let time = undefined;
// подтверждение
let conf = undefined;
// текущая таска
let taskId = undefined;


const sub = new Subject();

//======================================================================================================================


function callbackSpendTime() {
   lib.requests.closeTask(taskId, message, ()=>lib.methods.selectTask());
    log('info',"задача закрыта, время учтено");
}


function requestClosetask(t) {
    console.log(t);
    taskId = t;
    // основная подписка
    inquirer.prompt(sub).ui.process.subscribe((q) => {
        message = (q.name === 'message') ? q.answer : message;
        time = (q.name === 'time') ? q.answer : time;
        conf = (q.name === 'conf') ? q.answer : conf;
        if (!conf) {
             if(message && time && conf === undefined) apply();
            (conf === false) && (conf = time = message = undefined, req(taskId));
        } else {
            sub.unsubscribe();
            lib.requests.spendTime(taskId, message, time, callbackSpendTime);
        }
    });
    req();
}

function apply() {
    sub.next({
            type: 'confirm',
            message: `Задача: ${taskId}
Коммент: ${message}
Время: ${ time.slice(0, 2) + 'час ' +  time.slice(2, 4) + ' минут'} верно?`,
            name: 'conf'
        }
    );
}


// зацикленная функция
function req() {
    sub.next({
            type: 'input',
            message: `Напишите комментарий:`,
            name: 'message'
        }
    );
    sub.next({
        type: 'input',
        message: `Сколько часов потрачено на задачу (пример 00.45) `,
        name: 'time',
        validate: (t => {
            const val = !isNaN(t) && t.length <= 4;
            (!val) && console.log(`Не верный формат (${t})!!`);
            return val;
        }),
        transformer: (t => {
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
