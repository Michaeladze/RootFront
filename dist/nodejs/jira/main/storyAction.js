"use strict";
var inquirer = require('inquirer');
var child_process = require('child_process');
var menuData1 = ['Создать ветку', 'Показать описание задачи', 'Назначить на меня', 'Закрыть задачу в jira', '<----- Назад'];
var lib = require('./../create');
function storyAction(answers) {
    inquirer
        .prompt([{
            type: 'list',
            message: "\u0427\u0442\u043E \u0434\u0435\u043B\u0430\u0435\u043C \u0441 \u0437\u0430\u0434\u0430\u0447\u0435\u0439 " + answers.value + "?",
            name: 'id',
            choices: [].concat(menuData1)
        }
    ])
        .then(function (a) {
        switch (a.id) {
            case menuData1[0]:
                console.log("\u0412\u0435\u0442\u043A\u0430 feature/" + answers.value + " \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0437\u0434\u0430\u043D\u0430");
                child_process.exec("git checkout -b feature/" + answers.value + " develop ");
                child_process.exec("git push --set-upstream origin HEAD");
                child_process.exec("git pull origin develop");
                break;
            case menuData1[1]:
                console.log("*************************************************************\n*************************************************************\n          " + answers.description + "\n*************************************************************\n*************************************************************");
                storyAction(answers);
                break;
            case menuData1[2]:
                lib.requests.assigneeTaskTo(answers.value, function () { return storyAction(answers); });
                break;
            case menuData1[3]:
                lib.methods.requestClosetask(answers.value);
                break;
            case menuData1[4]:
                console.clear();
                lib.methods.getTasks();
                break;
        }
    });
}
//--------------------------
exports.storyAction = storyAction;
