"use strict";
var inquirer = require('inquirer');
var lib = require('./../create');
var log = require('./../utils/log').log;
//--------------------------
global.REQ = '';
var menuData = ['Мои задачи', 'Мои задачи в текущем спринте', 'Все задачи в текущем спринте', 'Закрыть текущую задачу', 'Забацать PullRequest', 'ВЫЙТИ'];
function selectTask() {
    inquirer
        .prompt([{
            type: 'list',
            message: 'Выберете действие(отображаются ТОЛЬКО поздадачи):',
            name: 'id',
            choices: [].concat(menuData)
        }
    ]).then(function (answers) {
        switch (answers.id) {
            case menuData[0]:
                global.REQ = 'assignee=currentuser() AND project=IRAPM AND resolution=Unresolved AND status not in (Closed , resolved)';
                lib.methods.getTasks();
                break;
            case menuData[1]:
                global.REQ = 'assignee=currentuser() AND project=IRAPM AND resolution=Unresolved AND status not in (Closed , resolved) AND (Sprint  in (openSprints()) )';
                lib.methods.getTasks();
                break;
            case menuData[2]:
                global.REQ = 'project=IRAPM AND resolution=Unresolved AND status not in (Closed , resolved) AND (Sprint  in (openSprints()) )';
                lib.methods.getTasks(true);
                break;
            case menuData[3]:
                lib.utils.currentBrunch() ?
                    lib.methods.requestClosetask(lib.utils.currentBrunch()) :
                    log('error', "\n                    " + lib.utils.currentBrunch() + "\n                    !!!!!!!!!!!!! \u041D\u0435 \u0432\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0432\u0435\u0442\u043A\u0438 \u0432 \u0433\u0438\u0442\u0435 !!!!!!!!!!!!!!!!!!!", lib.methods.selectTask);
                break;
            case menuData[4]:
                lib.utils.currentBrunch() ?
                    lib.requests.createPr(lib.methods.selectTask) :
                    log('error', '!!!!!!!!!!!!! Не верный формат ветки в гите !!!!!!!!!!!!!!!!!!!', lib.methods.selectTask);
                break;
            case menuData[5]:
                break;
        }
    });
}
;
//--------------------------
exports.selectTask = selectTask;
